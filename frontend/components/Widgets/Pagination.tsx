import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, BoxProps, Button, Flex, Text } from "@chakra-ui/react";

interface PaginationProps extends BoxProps {
  wrapperEl?: any;
  // no. of elements in a page
  pageLimit: number;
  // total no. of elements
  maxEl: number;
  getNoOfElDisplayed?: (num: number) => void;
}

const Pagination = ({
  wrapperEl: WrapperEl,
  pageLimit,
  maxEl,
  getNoOfElDisplayed,
  children,
  ...props
}: PaginationProps) => {
  const [startIndx, setStartIndx] = useState<number>(0);
  const [endIndx, setEndIndx] = useState<number>(pageLimit);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [currentSelectedPage, setCurrentSelectedPage] = useState<number>(0);

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

    if (getNoOfElDisplayed) getNoOfElDisplayed(newEndIndx - newStartIndx);
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

    if (getNoOfElDisplayed) getNoOfElDisplayed(newEndIndx - newStartIndx);
  };

  useEffect(() => {
    if (maxEl > 0) setNumberOfPages(Math.ceil(maxEl / pageLimit));
  }, [maxEl, pageLimit]);

  return (
    <Box {...(props as any)}>
      {WrapperEl ? (
        <WrapperEl>{(children as any).slice(startIndx, endIndx)}</WrapperEl>
      ) : (
        (children as any).slice(startIndx, endIndx)
      )}
      <Flex flexDirection="row" gridGap={3} justifyContent="center" mt="5vh">
        <Button variant="outline" borderRadius="md" onClick={movePrev}>
          <ChevronLeftIcon />
        </Button>
        {new Array(numberOfPages).fill(0).map((_, i) => {
          return (
            <Box
              bg={currentSelectedPage == i ? "secondary.200" : "gray.50"}
              color={currentSelectedPage == i ? "white" : "gray.600"}
              transition="all ease-in-out 0.2s"
              padding="0.5rem 1rem"
              borderRadius="md"
              cursor="pointer"
            >
              <Text>{i}</Text>
            </Box>
          );
        })}
        <Button variant="outline" borderRadius="md" onClick={moveNext}>
          <ChevronRightIcon />
        </Button>
      </Flex>
    </Box>
  );
};

export default Pagination;
