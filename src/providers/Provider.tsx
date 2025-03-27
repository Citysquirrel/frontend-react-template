import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { Suspense } from "react";
import { Loading } from "../components/Loading";
import theme from "../utils/theme";
import { Provider as JotaiProvider } from "jotai";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 재요청 방지
			retry: 3, // 실패 시 최대 3번 재시도
			staleTime: 1000 * 60 * 5, // 데이터가 오래되지 않은 상태로 간주될 시간 (5분)
		},
		mutations: {
			retry: 1, // mutation 실패 시 1번만 재시도
		},
	},
});

//! Jotai를 명시적으로 전역 상태로 사용하기 위해 본 루트에 포함합니다.
export function RootProvider({ children }: { children: React.ReactNode }) {
	return (
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<JotaiProvider>
					<Suspense fallback={<Loading options={{ mode: "fullscreen" }} />}>{children}</Suspense>
					{import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
				</JotaiProvider>
			</QueryClientProvider>
		</ChakraProvider>
	);
}
