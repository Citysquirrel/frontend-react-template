import { atom } from "jotai";

export const countAtom = atom<number>(0);
export const nowAtom = atom<Date>(new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })));
