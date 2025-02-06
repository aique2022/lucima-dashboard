import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryKey,
} from "@tanstack/react-query";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface FetchApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: Record<string, any> | null;
  token?: string;
}

export const fetchApi = async <T,>(
  endpoint: string,
  { method = "GET", data = null, token = "" }: FetchApiOptions = {}
): Promise<T> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (data && (method === "POST" || method === "PUT")) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Custom Hook for GET Requests
export const useFetchData = <T,>(endpoint: string, token = "") => {
  return useQuery<T, Error>({
    queryKey: ["data", endpoint],
    queryFn: () => fetchApi<T>(endpoint, { method: "GET", token }),
  });
};

// Custom Hook for POST Requests
export const usePostData = <
  T,
  U extends Record<string, any> | null | undefined
>(
  endpoint: string,
  token = ""
) => {
  const queryClient = useQueryClient();
  return useMutation<T, Error, U>({
    mutationFn: (data: U) =>
      fetchApi<T>(endpoint, { method: "POST", data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data", endpoint] }); // Refetch data after mutation
    },
  });
};
