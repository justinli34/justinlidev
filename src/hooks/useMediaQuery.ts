import { useSyncExternalStore } from "react";

export default function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const matchMedia = window.matchMedia(query);
      matchMedia.addEventListener("change", callback);
      return () => matchMedia.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false, // Server-side fallback value
  );
}
