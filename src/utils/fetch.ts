export interface FetchOptions extends RequestInit {
	method?: "POST" | "DELETE" | "PATCH" | (string & {});
	timeout?: number;
}

interface FetchResponse<T = any> {
	data?: T;
	headers?: Headers;
	status: number;
	statusText: string;
}

export async function fetch_<T = any>(input: RequestInfo | URL, options?: FetchOptions): Promise<FetchResponse<T>> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), options?.timeout || 20000);

	try {
		const res = await fetch(input, {
			...options,
			signal: controller.signal,
		});

		clearTimeout(timeoutId);

		const { headers, status, statusText } = res;

		let data: T | undefined;
		try {
			data = await res.json();
		} catch (jsonError) {
			console.error("Failed to parse JSON response", jsonError);
			data = undefined;
		}

		return { data, headers, status, statusText };
	} catch (err: any) {
		clearTimeout(timeoutId);

		if (err.name === "AbortError") {
			return { data: undefined, status: 408, statusText: "Request Timeout", headers: undefined };
		}

		const errorMessage = err.stack?.split("\n")[0] || err.message || "Unknown Error";
		console.error("Fetch Error:", errorMessage);

		return { data: undefined, status: 500, statusText: errorMessage, headers: undefined };
	}
}
