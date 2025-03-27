import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { RootProvider } from "./providers/Provider.tsx";
import { router } from "./_router.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RootProvider>
			<RouterProvider router={router} />
		</RootProvider>
	</StrictMode>
);

