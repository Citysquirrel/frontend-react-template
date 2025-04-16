import { useRef, useEffect } from "react";

/**
 * 리액트에서의 효율적인 setInterval 사용을 위한 훅입니다.
 * @param callback
 * @param timeout
 * @param options
 * @returns
 */
export function useImprovedInterval(
	callback: () => void,
	timeout: number | null | undefined,
	options?: ImprovedIntervalOptions
) {
	const savedCallback = useRef<Function>(() => {});
	const lastExecutionTime = useRef<number>(new Date().getTime());
	const intervalId = useRef<number | undefined>(undefined);
	const mergedOptions: Required<ImprovedIntervalOptions> = { executeCallbackWhenWindowFocused: false, ...options };

	const executeCallback = () => {
		savedCallback.current();
		lastExecutionTime.current = new Date().getTime();
	};

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		if (!timeout) return;

		intervalId.current = setInterval(executeCallback, timeout);

		const blur = () => {
			clearInterval(intervalId.current);
		};

		const focus = () => {
			intervalId.current = setInterval(executeCallback, timeout);

			if (mergedOptions.executeCallbackWhenWindowFocused) {
				const currentTime = new Date().getTime();
				if (currentTime - lastExecutionTime.current > timeout) {
					executeCallback();
				}
			}
		};

		window && window.addEventListener("blur", blur);
		window && window.addEventListener("focus", focus);
		return () => {
			clearInterval(intervalId.current);
			window && window.removeEventListener("blur", blur);
			window && window.removeEventListener("focus", focus);
		};
	}, [timeout]);

	return { lastExecutionTime, intervalId };
}

interface ImprovedIntervalOptions {
	executeCallbackWhenWindowFocused?: boolean;
}
