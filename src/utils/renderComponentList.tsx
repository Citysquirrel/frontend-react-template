import { Text } from "@chakra-ui/react";
import { JSX } from "react";
import ErrorBoundary from "../components/ErrorBoundary";

export function renderComponentList<T>(
	list: T[],
	callback: (data: T, index: number, array: T[]) => JSX.Element,
	fallbackComponent: JSX.Element | null = null,
	errorComponent: JSX.Element = <Text fontSize={"sm"}>컴포넌트 에러</Text>
) {
	return (
		<ErrorBoundary fallback={errorComponent}>
			{list.length > 0 ? list.map(callback) : fallbackComponent ?? null}
		</ErrorBoundary>
	);
}
