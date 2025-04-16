export function stringNullCheck(str: string | null | undefined) {
	if (str === null || str === undefined) {
		return "";
	} else return str;
}

export function objectNullCheck(obj: Object): Object {
	const result = {};
	for (let [key, value] of Object.entries(obj)) {
		result[key] = stringNullCheck(value);
	}
	return result;
}

export function objectBoolCheck(obj: Object): Object {
	const result = {};
	for (const [key, value] of Object.entries(obj)) {
		result[key] = !!value;
	}

	return result;
}
