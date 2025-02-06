import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:8000";

export default function useSocket() {
  const [socket, setSocket] = useState<Socket<Record<string, any>> | null>(
    null
  );

  useEffect(() => {
    // Create a socket instance with reconnection options
    const socketInstance = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      reconnection: true, // Enable reconnection
      reconnectionAttempts: Infinity, // Unlimited attempts
      reconnectionDelay: 1000, // Initial delay for reconnection
      reconnectionDelayMax: 5000, // Maximum delay for reconnection
      timeout: 20000, // Connection timeout
    });

    // Set the socket instance in state
    setSocket(socketInstance);

    // Log connection and reconnection status
    socketInstance.on("connect", () => {
      console.log("Connected to server");
    });

    socketInstance.on("reconnect", (attemptNumber) => {
      console.log(`Reconnected to server on attempt: ${attemptNumber}`);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Cleanup function to remove socket listeners and disconnect
    return () => {
      socketInstance.off("connect");
      socketInstance.off("reconnect");
      socketInstance.off("disconnect");
      socketInstance.disconnect();
    };
  }, []);

  return socket;
}
