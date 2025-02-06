export function TableSkeleton() {
  return (
    <div className="w-full">
      {/* Header skeleton */}

      {/* Table skeleton */}
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors">
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b transition-colors">
                  <td className="p-4">
                    <div className="h-4 w-36 animate-pulse rounded bg-muted" />
                  </td>
                  <td className="p-4">
                    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                  </td>
                  <td className="p-4">
                    <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                  </td>
                  <td className="p-4">
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  </td>
                  <td className="p-4">
                    <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  </td>
                  <td className="p-4">
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  </td>
                  <td className="p-4">
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="flex items-center justify-between py-4">
        <div className="h-4 w-36 animate-pulse rounded bg-muted" />
        <div className="flex items-center space-x-2">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="flex items-center space-x-1">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-8 w-8 animate-pulse rounded bg-muted"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
