import { useEffect } from "react";

/**
 * 상태를 추적하여 console.log 실행해주기 위한 훅입니다.
 * @param value
 * @param name
 * @returns
 */
export function useConsole(value: any, name: string | undefined = undefined) {
	useEffect(() => {
		if (import.meta.env.DEV)
			if (!name) {
				console.log(value);
			} else console.log({ [name]: value });
	}, [value]);
	return value;
}
