import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Link,
  LinkProps,
  Flex,
  BoxProps,
} from "@chakra-ui/layout";
import {
  InputGroup,
  InputGroupProps,
  InputLeftAddon,
  Input,
  InputRightAddon,
} from "@chakra-ui/input";
import { Button, Tooltip } from "@chakra-ui/react";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";
import { isAuthenticated } from "../../util/Authenticated";
import SelectCategory from "../Admin/SelectCategory";
import logout from "../../util/Logout";
import { FiShoppingCart } from "react-icons/fi";
import { useWindowDimensions } from "../../hooks/UseWindowDimensions";
import { FaSearch } from "react-icons/fa";

const Header: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [width, height] = useWindowDimensions();

  useEffect(() => {
    isAuthenticated()
      .then(() => {
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }, []);

  const SearchBar = ({ ...props }: InputGroupProps) => {
    return (
      <InputGroup color="gray" display="flex" {...props}>
        <Input
          flex="0.78"
          placeholder="Search"
          backgroundColor="white"
          borderWidth="0"
          borderLeftRadius="md"
          borderRadius="none"
          height="4.2vh"
          minHeight="2.5em"
          color="secondaryBlue.900"
        />
        <InputRightAddon
          flex="0"
          backgroundColor="#9D84B7"
          height="4.2vh"
          minHeight="2.5em"
          color="white"
          borderColor="#9D84B7"
          position="relative"
          cursor="pointer"
        >
          <FaSearch />
        </InputRightAddon>
      </InputGroup>
    );
  };

  const ShopIcons = ({ ...props }: BoxProps) => {
    return (
      <Box {...props}>
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

  const LoginLink = ({ ...props }: LinkProps) => {
    if (!authenticated) {
      return (
        <Link
          href="/login"
          fontFamily="Sora"
          textUnderlineOffset="0.1em"
          marginTop="0.2em"
          {...props}
        >
          Login
        </Link>
      );
    } else {
      return (
        <Link
          onClick={() => logout()}
          fontFamily="Sora"
          textUnderlineOffset="0.2em"
          {...props}
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
      height="initial"
      minHeight="4em"
      backgroundColor="#091353"
      color="white"
      padding="2%"
      overflow="hidden"
    >
      <Flex
        flexDirection={"row"}
        gridColumn={4}
        gridGap={10}
        paddingTop="0.3em"
        width="100%"
        height="inherit"
        flexWrap="wrap"
      >
        <Heading
          as="h1"
          size="md"
          fontFamily="Sora"
          flex="1.5"
          marginTop="0.2em"
          cursor="pointer"
          onClick={() => window.location.assign("/")}
          isTruncated
        >
          Ecommerce Design
        </Heading>
        <SearchBar flex="4" />
        {width > 950 ? <ShopIcons flex="1" marginTop="0.1em" /> : null}
        <LoginLink flex="1" marginTop="0.2em" />
      </Flex>
    </Box>
  );
};

export default Header;
