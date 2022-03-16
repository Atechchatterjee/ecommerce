import {useState, useLayoutEffect} from "react";

export const useDynamicColumns = (
  initialColumns: number,
  breakPoints: number[]
): [number, (_: number) => void] => {
  const [columns, setColumns] = useState<number>(initialColumns);

  useLayoutEffect(() => {
    const updateSize = () => {
      for(let i = 0; i < breakPoints.length; i++) {
        if (window.innerWidth >= breakPoints[i]) {
          setColumns(initialColumns - i);
          break;
        }
      }
      if(window.innerWidth < breakPoints[breakPoints.length-1]) {
        setColumns(1);
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return [columns, setColumns];
};