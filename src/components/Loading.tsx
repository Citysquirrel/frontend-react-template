import { Stack } from "@chakra-ui/react";
import { LoadingProps } from "../types/components";

export function Loading({ options }: LoadingProps) {
	return (
		<Stack
			sx={{
				position: "fixed",
				left: 0,
				top: 0,
				width: "100vw",
				height: "100vh",
				alignItems: "center",
				justifyContent: "center",
				zIndex: 1001,
				"> svg": {
					boxSize: "128px",
					animation: "rotate 1s ease infinite",
					transformOrigin: "50% 50%",
				},
			}}
		>
			<svg
				width="100"
				height="100"
				viewBox="0 0 100 100"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				stroke="#3498db"
				strokeWidth="10"
			>
				<circle cx="50" cy="50" r="40" strokeOpacity="0.3" />
				<circle
					cx="50"
					cy="50"
					r="40"
					strokeDasharray="62.83185307179586 62.83185307179586"
					strokeDashoffset="62.83185307179586"
				/>
			</svg>
		</Stack>
	);
}
