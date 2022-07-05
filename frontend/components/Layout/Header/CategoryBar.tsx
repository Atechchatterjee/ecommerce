import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Text,
  Flex,
  Box,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import { scrollBarStyle } from "../../../util/ScrollBarStyle";
import HamburgerButton from "./HambergerButton";

interface CategoryBarProps {
  onClick?: () => void;
}

const CategoryBar = ({ onClick }: CategoryBarProps) => {
  return (
    <Box zIndex="-1">
      <Box
        className="sub-header"
        overflowY="hidden"
        justifyItems="center"
        bgColor="primary.500"
        color="gray.300"
        sx={scrollBarStyle({ hidden: true, scrollbarWidth: "none" })}
      >
        <Flex
          flexDirection="row"
          gridGap={10}
          w="max-content"
          h="6vh"
          flexWrap="nowrap"
          textAlign="justify"
        >
          <Box flex="0.1" mt="1.8vh">
            <HamburgerButton
              mt="-4.5%"
              ml="10%"
              color="white"
              onClick={onClick}
            />
          </Box>
          <Flex flexDirection="row" mt="1vh" ml="1rem">
            <Menu autoSelect={false}>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                bg="primary.200"
                color="white"
                _hover={{ backgroundColor: "primary.100" }}
                _active={{ bg: "primary.100" }}
                _focus={{ outline: "none" }}
              >
                <Flex flexDirection="row" gridGap="4">
                  <FaFilter
                    style={{ flex: "1", marginTop: "0.05rem" }}
                    size="14"
                  />
                  <Text flex="1">Filter By</Text>
                </Flex>
              </MenuButton>
              <MenuList bg="primary.500">
                <MenuItem _hover={{ bg: "primary.200" }}>price</MenuItem>
                <MenuItem _hover={{ bg: "primary.200" }}>unit</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default CategoryBar;
