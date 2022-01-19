import React, { useEffect, useState, useRef } from "react";
import { HStack, Text, Heading, Center, Link } from "@chakra-ui/layout";
import {
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
} from "@chakra-ui/input";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";
import { useCookies } from "react-cookie";
import { isAuthenticated } from "../../util/Authenticated";
import { convertToCategoryTree, getRootNodes } from "../../util/Tree";
import SelectCategory, { getAllCategory } from "../Admin/SelectCategory";
import logout from "../../util/Logout";

const Header: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [rootCategories, setRootCategories] = useState<any[]>([]);
  const [cookies] = useCookies(["token"]);

  const CategoryMenu: React.FunctionComponent<any> = ({ ...props }) => {
    const [selectedItem, selectItem] = useState<string>("All Categories");
    const menuBtnColor = useRef<string>("#9D84B7");

    return (
      <Menu {...props}>
        <MenuButton
          backgroundColor={menuBtnColor.current}
          color="white"
          marginLeft="-0.1em"
          as={Button}
          rightIcon={<ChevronDownIcon />}
          style={{ fontSize: "0.9em" }}
          width="35.1"
          fontWeight="400"
          borderLeftRadius="3xl"
          borderRightRadius="none"
          _hover={{ backgroundColor: "#b799d6" }}
          _active={{ backgroundColor: "#b799d6" }}
        >
          <Text>{selectedItem}</Text>
        </MenuButton>
        <MenuList style={{ fontSize: "0.9em" }}>
          <MenuItem
            value="All Categories"
            onClick={(event: any) => selectItem(event.target.value)}
          >
            All Categories
          </MenuItem>
          {rootCategories.map((categoryNode: any) => (
            <MenuItem
              key={categoryNode.val.category_name}
              value={categoryNode.val.category_name}
              onClick={(event: any) => selectItem(event.target.value)}
            >
              {categoryNode.val.category_name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  };

  useEffect(() => {
    isAuthenticated(cookies)
      .then(() => {
        console.log("user is authenticated");
        setAuthenticated(true);
      })
      .catch(() => {
        console.log("user is not authenticated");
        setAuthenticated(false);
      });
    getAllCategory().then((categories) => {
      const tree = convertToCategoryTree(categories);
      const rootNodes = getRootNodes(tree);
      console.log({ rootNodes });
      setRootCategories(rootNodes);
    });
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Center
        className="header-up"
        width="full"
        height="8em"
        backgroundColor="#091353"
        color="white"
      >
        <HStack style={{ paddingTop: "0" }}>
          <Heading
            as="h1"
            size="md"
            fontFamily="Roboto"
            style={{ width: "30rem", marginLeft: "0", cursor: "pointer" }}
            marginLeft="-5em"
            onClick={() => window.location.assign("/")}
          >
            Ecommerce Design
          </Heading>
          <InputGroup
            style={{ width: "45rem", marginLeft: "7%", color: "gray" }}
          >
            <InputLeftAddon
              style={{ padding: "0.2px" }}
              borderLeftRadius="3xl"
              borderRightRadius="none"
            >
              <CategoryMenu />
            </InputLeftAddon>
            <Input
              style={{ fontSize: "0.9em" }}
              placeholder="I am shopping for ..."
              width="35em"
              backgroundColor="white"
              borderWidth="0"
              borderRadius="none"
            />
            <InputRightAddon
              // backgroundColor= "#F9C200"
              backgroundColor="#9D84B7"
              color="white"
              borderColor="#9D84B7"
              borderRadius="3xl"
              width="6em"
            >
              <Text cursor="pointer" fontSize="0.8em" marginLeft="0.5em">
                Search
              </Text>
            </InputRightAddon>
          </InputGroup>
          <HStack style={{ marginLeft: "10%" }} spacing={5}>
            <FaRegHeart size={25} style={{ cursor: "pointer" }} />
            <AiOutlineShopping
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => window.location.assign("/shop")}
            />
            <FaRegUser size={25} style={{ cursor: "pointer" }} />
          </HStack>
          {!authenticated ? (
            <Link style={{ marginLeft: "5em" }} href="/login">
              Login
            </Link>
          ) : (
            <Link style={{ marginLeft: "5em" }} onClick={() => logout()}>
              logout
            </Link>
          )}
        </HStack>
      </Center>
      <Center
        className="header-mid"
        backgroundColor="#4f5bba"
        marginLeft="-50em"
        height="3em"
      >
        <SelectCategory
          text="Browse Category"
          bgColor="#9D84B7"
          borderRadius="none"
          width="13em"
          height="3em"
        />
        <Link fontWeight={700} color="white" marginLeft="1em" width="inherit">
          All Products
        </Link>
      </Center>
    </div>
  );
};

export default Header;
