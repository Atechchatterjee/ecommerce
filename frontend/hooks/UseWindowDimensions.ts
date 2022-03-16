import {useState, useLayoutEffect} from "react";

export const useWindowDimensions = (
  ): [width: number, height: number] => {
  const [dimensions, setDimensions] = useState<[width: number, height: number]>([0, 0]);

  useLayoutEffect(() => {
    const updateSize = () => {
      setDimensions([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return dimensions;
};