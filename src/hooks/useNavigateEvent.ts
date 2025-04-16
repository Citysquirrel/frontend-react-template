import { NavigateOptions, To, useNavigate } from "react-router-dom";

/**
 * 이벤트 핸들러에 navigate 기능만 간단하게 적용하는 목적으로 사용합니다.
 * @returns
 */
export function useNavigateEvent() {
	const navigate = useNavigate();
	return (to: To, options?: NavigateOptions | undefined) => () => {
		navigate(to, options);
	};
}
