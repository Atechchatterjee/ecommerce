import { useState, useEffect } from "react";

interface PaginationProps {
  pageLimit: number; // no. of elements per page
  maxEl: number; // total no. of elements
}

const usePagination = ({ pageLimit, maxEl }: PaginationProps) => {
  const [startIndx, setStartIndx] = useState<number>(0);
  const [endIndx, setEndIndx] = useState<number>(pageLimit);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [currentSelectedPage, setCurrentSelectedPage] = useState<number>(0);
  const [numberOfElementDisplayed, setNumberOfElementDisplayed] =
    useState<number>(0);

  const moveNext = () => {
    let newStartIndx = startIndx,
      newEndIndx = endIndx;

    if (endIndx < maxEl) {
      newStartIndx = endIndx;
      setCurrentSelectedPage(currentSelectedPage + 1);
    }

    if (endIndx + pageLimit <= maxEl) {
      newEndIndx = endIndx + pageLimit;
    } else if (maxEl - endIndx > 0) {
      newEndIndx = maxEl;
    }

    setStartIndx(newStartIndx);
    setEndIndx(newEndIndx);

    setNumberOfElementDisplayed(newEndIndx - newStartIndx);
  };

  const movePrev = () => {
    let newStartIndx = startIndx,
      newEndIndx = endIndx;

    if (startIndx - pageLimit >= 0) {
      newStartIndx = startIndx - pageLimit;
      setCurrentSelectedPage(currentSelectedPage - 1);
    } else newStartIndx = 0;
    if (endIndx - pageLimit > 0) {
      newEndIndx = endIndx - (endIndx - startIndx);
    } else newEndIndx = pageLimit;

    setStartIndx(newStartIndx);
    setEndIndx(newEndIndx);

    setNumberOfElementDisplayed(newEndIndx - newStartIndx);
  };

  useEffect(() => {
    if (maxEl > 0) setNumberOfPages(Math.ceil(maxEl / pageLimit));
  }, [maxEl, pageLimit]);

  return {
    moveNext,
    movePrev,
    numberOfElementDisplayed,
    numberOfPages,
    currentSelectedPage,
    startIndx,
    endIndx,
  };
};

export default usePagination;
