export default function confirmOnExit() {
	const handleBeforeUnload = (event: any) => {
		event.preventDefault();
		event.returnValue = "";
	};

	const activeBeforeUnload = () => {
		window.addEventListener("beforeunload", handleBeforeUnload);
	};
	const disableBeforeUnload = () => {
		window.removeEventListener("beforeunload", handleBeforeUnload);
	};

	return { activeBeforeUnload, disableBeforeUnload };
}
