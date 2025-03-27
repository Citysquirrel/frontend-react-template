import { useCallback, useEffect } from "react";
import citysquirrelAvatar from "/citysquirrel.jpg";
import { Avatar, Button, Link, List, ListIcon, ListItem, Stack, Text } from "@chakra-ui/react";
import { CStack } from "./components/common/Stack";
import { Spacing } from "./components/common/Spacing";
import { MdSettings } from "react-icons/md";
import { TbCube } from "react-icons/tb";
import { countAtom } from "./atoms/atom";
import { useAtom } from "jotai";
import { renderComponentList } from "./utils/renderComponentList";

export default function App() {
	// #region 상수와 변수 정의
	const packageList = [
		{ name: "Chakra UI", src: "https://v2.chakra-ui.com/getting-started", isDev: false },
		{ name: "React Query", src: "https://tanstack.com/query/latest/docs/framework/react/overview", isDev: false },
		{ name: "Jotai", src: "https://jotai.org/docs", isDev: false },
		{ name: "is-mobile", src: "https://www.npmjs.com/package/is-mobile", isDev: false },
		{ name: "immutability-helper", src: "https://www.npmjs.com/package/immutability-helper", isDev: false },
		{ name: "uuid", src: "https://www.npmjs.com/package/uuid", isDev: false },
		{ name: "Vite", src: "https://ko.vite.dev/guide/features.html", isDev: true },
		{
			name: "Typescript",
			src: "https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html",
			isDev: true,
		},
		{ name: "Eslint", src: "https://eslint.org/docs/latest/", isDev: true },
		{ name: "cross-env", src: "https://www.npmjs.com/package/cross-env", isDev: true },
	];
	// #endregion

	// #region 상태 정의
	const [count, setCount] = useAtom(countAtom);
	// #endregion

	// #region 이벤트 핸들러 정의
	const handleIncrement = useCallback(() => {
		setCount((prev) => prev + 1);
	}, []);
	// #endregion

	// #region 사이드 이펙트 처리
	useEffect(() => {
		const timer = setInterval(() => {
			console.log("Interval running...");
		}, 1000);
		return () => clearInterval(timer);
	}, []);
	// #endregion

	return (
		<CStack height="100vh">
			<Stack gap="0" position="relative">
				<Stack
					top="-60px"
					left="-190px"
					position="absolute"
					borderRadius={"full"}
					backgroundColor={"purple.50"}
					boxSize="480px"
					filter={"blur(.5px)"}
					zIndex={-1}
				></Stack>
				<Link href="https://github.com/citysquirrel" target="_blank">
					<Avatar src={citysquirrelAvatar} size={"xl"} showBorder />
					<Spacing size={4} />
					<Text fontWeight={"bold"} fontSize="xl" textAlign={"center"}>
						도시다람쥐
					</Text>
				</Link>
			</Stack>
			<Spacing size={8} />
			<Button size="sm" onClick={handleIncrement}>
				{count}
			</Button>
			<Spacing size={8} />
			<Text>개인용 리액트 템플릿입니다</Text>
			<Text>아래는 포함된 패키지 목록입니다</Text>
			<Spacing size={8} />
			<Stack width="240px" height="120px" overflowY={"auto"} fontSize="sm">
				<List>
					{renderComponentList(packageList, ({ name, src, isDev }, idx) => (
						<ListItem key={`${idx}-${name}`} _hover={{ backgroundColor: "gray.100" }}>
							<Link href={src} target="_blank" display="block">
								<ListIcon as={isDev ? MdSettings : TbCube} color="green.500" transform={"translateY(-2px)"} />
								{name}
							</Link>
						</ListItem>
					))}
				</List>
			</Stack>
			<Spacing size={32} />
		</CStack>
	);
}

