import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/Home/Home";

const devRoutes: RouteObject[] = import.meta.env.DEV ? [] : [];

export const routeObj: RouteObject[] = [
	...devRoutes,
	{
		path: "/",
		element: <App />,
		children: [{ path: "/", element: <Home /> }],
		errorElement: <>페이지가 망가졌습니다. 개발자에게 문의하세요</>,
	},
	{ path: "*", element: <></>, errorElement: <>페이지가 망가졌습니다. 개발자에게 문의하세요</> },
];

export const router = createBrowserRouter(routeObj);
