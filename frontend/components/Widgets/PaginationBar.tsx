import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

interface PaginationBarProps {
  numberOfPages: number;
  currentSelectedPage: number;
  moveNext: Function;
  movePrev: Function;
}

const PaginationBar = ({
  numberOfPages,
  currentSelectedPage,
  moveNext,
  movePrev,
}: PaginationBarProps) => (
  <Flex
    flexDirection="row"
    gridGap={3}
    justifyContent="center"
    mt="5vh"
    height="2.5rem"
  >
    <Button variant="outline" borderRadius="md" onClick={() => movePrev()}>
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

    <Button variant="outline" borderRadius="md" onClick={() => moveNext()}>
      <ChevronRightIcon />
    </Button>
  </Flex>
);

export default PaginationBar;
