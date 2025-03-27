import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dependencies } from "./package.json";
import ssl from "@vitejs/plugin-basic-ssl";

// 리액트 관련 패키지를 하나의 js 파일로 변환합니다.
const vendor = ["react", "react-router-dom", "react-dom", "react-icons"];
//! Custom: 기타 가벼운 라이브러리 패키지들을 하나의 js 파일로 변환합니다. 무거운 것은 따로 나누는 것을 권장합니다.
const libs = ["uuid", "jotai", "is-mobile", "immutability-helper"];
const excludes = [...vendor, ...libs];

function renderChunks(deps: Record<string, string>) {
	const chunks: { [key: string]: string[] } = {};
	Object.keys(deps).forEach((key) => {
		if (excludes.includes(key)) return;
		chunks[key] = [key];
	});
	return chunks;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	if (mode === "production")
		return {
			plugins: [react()],
			build: {
				rollupOptions: {
					output: {
						manualChunks: {
							vendor,
							libs,
							...renderChunks(dependencies),
						},
						entryFileNames: "[name].[hash].js",
						chunkFileNames: "chunks/[name].[hash].js",
						assetFileNames: "assets/[name].[hash][extname]",
					},
				},
				sourcemap: false,
			},
		};
	// 로컬에서는 따로 ssl 설정이 들어가고 불필요한 청크 네이밍이 빠집니다.
	else
		return {
			plugins: [react(), ssl()],
			server: {
				https: true,
			},
			build: {
				rollupOptions: {
					output: {
						manualChunks: {
							vendor,
							libs,
							...renderChunks(dependencies),
						},
					},
				},
			},
		};
});

