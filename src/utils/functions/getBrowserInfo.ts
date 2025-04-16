export function getBrowserInfo() {
	const userAgent = navigator.userAgent.toLowerCase();

	if (userAgent.includes("chrome") && !userAgent.includes("edge") && !userAgent.includes("opr")) {
		return "Chrome";
	} else if (userAgent.includes("firefox")) {
		return "Firefox";
	} else if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
		return "Safari";
	} else if (userAgent.includes("edge")) {
		return "Edge";
	} else if (userAgent.includes("msie") || userAgent.includes("trident")) {
		return "Internet Explorer";
	}
	return "Unknown";
}
