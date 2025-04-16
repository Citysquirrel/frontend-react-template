import { useEffect } from "react";
import { useAtom } from "jotai";
import { nowAtom } from "../atoms/atom";

export function useNow(timeout?: number) {
	const [, setNow] = useAtom(nowAtom);
	useEffect(() => {
		const i = setInterval(() => {
			let ms = new Date().getMilliseconds();
			if (ms) setNow(new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })));
		}, timeout || 1000);

		return () => {
			clearInterval(i);
		};
	}, []);
}
