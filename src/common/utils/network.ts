export const isOnline = () => navigator.onLine;

export const networkStatusOnline = (cb: any) => {
    window.addEventListener("online", cb)
}