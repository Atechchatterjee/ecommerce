import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Box,
  HStack,
  Text,
  Heading,
  Center,
  Link,
  Flex,
} from "@chakra-ui/layout";
import {
  InputGroup,
  InputGroupProps,
  InputLeftAddon,
  Input,
  InputRightAddon,
} from "@chakra-ui/input";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { Button, Tooltip } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";
import { useCookies } from "react-cookie";
import { isAuthenticated } from "../../util/Authenticated";
import { convertToCategoryTree, getRootNodes } from "../../util/Tree";
import SelectCategory, { getAllCategory } from "../Admin/SelectCategory";
import logout from "../../util/Logout";
import { FiShoppingCart } from "react-icons/fi";

const Header: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [rootCategories, setRootCategories] = useState<any[]>([]);
  const [cookies] = useCookies(["token"]);

  const CategoryMenu: React.FunctionComponent<any> = ({ ...props }) => {
    const [selectedItem, selectItem] = useState<string>("All Categories");
    const menuBtnColor = useRef<string>("#9D84B7");

    return (
      <Menu autoSelect={false} {...props}>
        <MenuButton
          backgroundColor={menuBtnColor.current}
          fontFamily="Sora"
          color="white"
          marginLeft="-0.1em"
          as={Button}
          rightIcon={<ChevronDownIcon />}
          style={{ fontSize: "0.9em" }}
          width="35.1"
          fontWeight="medium"
          // borderLeftRadius="3xl"
          borderRadiusLeft="md"
          borderRightRadius="none"
          _hover={{ backgroundColor: "#b799d6" }}
          _active={{ backgroundColor: "#b799d6" }}
        >
          <Text>{selectedItem}</Text>
        </MenuButton>
        <MenuList
          style={{ fontSize: "0.9em" }}
          borderColor="#091353"
          bgColor="#091353"
        >
          <MenuItem
            value="All Categories"
            onClick={(event: any) => selectItem(event.target.value)}
            bgColor="#091353"
            color="white"
            _hover={{ backgroundColor: "#3C488C" }}
            borderColor="#091353"
          >
            All Categories
          </MenuItem>
          {rootCategories.map((categoryNode: any) => (
            <MenuItem
              key={categoryNode.val.category_name}
              value={categoryNode.val.category_name}
              onClick={(event: any) => selectItem(event.target.value)}
              bgColor="#091353"
              color="white"
              _hover={{ backgroundColor: "#3C488C" }}
              borderColor="#091353"
            >
              {categoryNode.val.category_name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  };

  useEffect(() => {
    isAuthenticated()
      .then(() => {
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      });
    getAllCategory().then((categories) => {
      const tree = convertToCategoryTree(categories);
      const rootNodes = getRootNodes(tree);
      setRootCategories(rootNodes);
    });
  }, []);

  const SearchBar = ({ ...props }: InputGroupProps) => {
    return (
      <InputGroup color="gray" display="flex" flex="3" {...props}>
        <InputLeftAddon
          flex="0.1"
          style={{ padding: "0.2px" }}
          borderLeftRadius="md"
          borderRightRadius="none"
        >
          <CategoryMenu />
        </InputLeftAddon>
        <Input
          flex="0.7"
          style={{ fontSize: "0.9em" }}
          placeholder="I am shopping for ..."
          backgroundColor="white"
          borderWidth="0"
          borderRadius="none"
          color="secondaryBlue.900"
        />
        <InputRightAddon
          flex="0.03"
          backgroundColor="#9D84B7"
          color="white"
          borderColor="#9D84B7"
          position="relative"
        >
          <Button
            variant="pinkSolid"
            position="absolute"
            fontSize="0.9em"
            marginLeft="-1.3em"
            borderRightRadius="md"
            borderLeftRadius="none"
          >
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
    );
  };

  const ShopIcons = () => {
    return (
      <Box flex="0.2">
        <Flex gridGap={4} gridColumn={4}>
          <Tooltip label="whishlist" position="absolute">
            <span>
              <FaRegHeart
                size={25}
                style={{ cursor: "pointer", flex: "2", marginTop: "0.1em" }}
              />
            </span>
          </Tooltip>
          <Tooltip label="shop">
            <span>
              <AiOutlineShopping
                size={30}
                style={{ cursor: "pointer", flex: "2" }}
                onClick={() => window.location.assign("/shop")}
              />
            </span>
          </Tooltip>
          <Tooltip label="profile">
            <span>
              <FaRegUser
                size={25}
                style={{ cursor: "pointer", flex: "2", marginTop: "0.1em" }}
              />
            </span>
          </Tooltip>
          <Tooltip label="cart">
            <span>
              <FiShoppingCart
                size={25}
                style={{ cursor: "pointer", flex: "2", marginTop: "0.1em" }}
                onClick={() => window.location.assign("/cart")}
              />
            </span>
          </Tooltip>
        </Flex>
      </Box>
    );
  };

  const LoginLink = () => {
    if (!authenticated) {
      return (
        <Link
          style={{ marginLeft: "5em" }}
          href="/login"
          fontFamily="Sora"
          textUnderlineOffset="0.1em"
          marginTop="0.2em"
        >
          Login
        </Link>
      );
    } else {
      return (
        <Link
          style={{ marginLeft: "5em" }}
          onClick={() => logout()}
          fontFamily="Sora"
          textUnderlineOffset="0.2em"
          marginTop="0.2em"
        >
          logout
        </Link>
      );
    }
  };

  return (
    <Box
      width="full"
      className="header-up"
      height="8em"
      backgroundColor="#091353"
      color="white"
      padding="2.5em"
      position="sticky"
      overflow="hidden"
    >
      <Flex flexDirection={"row"} gridColumn={4} gridGap={10} width="100%">
        <Heading
          as="h1"
          size="md"
          fontFamily="Sora"
          flex="1"
          marginTop="0.2em"
          cursor="pointer"
          onClick={() => window.location.assign("/")}
        >
          Ecommerce Design
        </Heading>
        <SearchBar />
        <ShopIcons />
        <LoginLink />
      </Flex>
    </Box>
  );
};

export default Header;
