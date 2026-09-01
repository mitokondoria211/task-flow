import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // 認証エラーを自動リトライしない
      staleTime: 1000 * 60, // 1分間はキャッシュを使う
      refetchOnWindowFocus: false,
    },
  },
});
