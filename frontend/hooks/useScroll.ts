import { useEffect, useState } from "react";

export const useScroll = (): { scrollTop: number } => {
  const [scrollTop, setScrollTop] = useState<number>(0);

  useEffect(() => {
    const onScroll = (e: any) => setScrollTop(e.target?.scrollTop);

    if (document) {
      const root: HTMLElement | null = document.getElementById("window-root");
      if (root) root.addEventListener("scroll", onScroll);
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  return { scrollTop };
};
