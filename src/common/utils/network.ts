import { EventHandler } from "react";

export const isOnline = () => navigator.onLine;

export const networkStatusOnline = (cb: any) => {
    window.addEventListener("online", cb)
}