import {useState, useLayoutEffect} from "react";

export const useDynamicColumns = (
  initialColumns: number
): [number, (_: number) => void] => {
  const [columns, setColumns] = useState<number>(initialColumns);

  useLayoutEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1700) {
        setColumns(initialColumns);
      } else if (window.innerWidth < 1700 && window.innerWidth > 1300) {
        setColumns(initialColumns - 1);
      } else if (window.innerWidth <= 1300 && window.innerWidth > 860) {
        setColumns(initialColumns - 2);
      } else if (window.innerWidth <= 860) {
        if (initialColumns >= 3) setColumns(initialColumns - 3);
        else setColumns(1);
      } else setColumns(columns);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return [columns, setColumns];
};