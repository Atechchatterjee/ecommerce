import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

interface PaginationProps extends BoxProps {
  element?: any[];
}

const Pagination = ({ element, ...props }: PaginationProps) => {
  if (!element) return <></>;
  return <Box {...(props as any)}></Box>;
};

export default Pagination;
