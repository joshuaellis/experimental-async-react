/**
 * The simplest, bastardised version of @tanstack/react-query.
 */
import { createContext, use, useState, type PropsWithChildren } from "react";

interface QueryOptions<TData> {
  queryKey: string;
  queryFn: () => Promise<TData>;
}

const queryOptions = <TData,>(
  options: QueryOptions<TData>
): QueryOptions<TData> => options;

class QueryClient {
  private queryCache = new Map<string, Promise<any>>();

  public async ensureQueryData<TData>(
    options: QueryOptions<TData>
  ): Promise<TData> {
    const { queryKey, queryFn } = options;
    const cached = this.queryCache.get(queryKey);
    if (cached) {
      return cached;
    }
    const promise = queryFn();
    this.queryCache.set(queryKey, promise);
    return promise;
  }

  public invalidateQueries(queryKeys?: string[]) {
    if (queryKeys) {
      queryKeys.forEach((queryKey) => {
        this.queryCache.delete(queryKey);
      });
    } else {
      this.queryCache.clear();
    }
  }
}

const QueryClientContext = createContext<QueryClient | null>(null);

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientContext.Provider value={client}>
      {children}
    </QueryClientContext.Provider>
  );
};

function useQueryClient() {
  const client = use(QueryClientContext);

  if (!client) {
    throw new Error("useQueryClient must be used within a QueryClientProvider");
  }

  return client;
}

export { queryOptions, QueryClientProvider, useQueryClient };
