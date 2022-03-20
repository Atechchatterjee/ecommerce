import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Heading,
  Link,
  LinkProps,
  Flex,
  BoxProps,
} from "@chakra-ui/layout";
import { InputGroup, InputGroupProps, InputRightAddon } from "@chakra-ui/input";
import { Tooltip } from "@chakra-ui/react";
import { FaRegHeart, FaRegUser, FaHeart } from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";
import { isAuthenticated } from "../../util/Authenticated";
import logout from "../../util/Logout";
import { FiShoppingCart } from "react-icons/fi";
import { useWindowDimensions } from "../../hooks/UseWindowDimensions";
import { FaSearch } from "react-icons/fa";
import { CustomField } from "../Custom/CustomField";
import Fuse from "fuse.js";

interface HeaderProps {
  products?: [any[], (_: any[]) => void];
  originalProducts?: any[];
}

const Header: React.FC<HeaderProps> = ({ products, originalProducts }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [allProducts, setAllProducts] = products || [];
  const [searchBarAutoFocus, setSearchBarAutoFocus] = useState<boolean>(false);
  const [width] = useWindowDimensions();

  useEffect(() => {
    isAuthenticated()
      .then(() => {
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }, []);

  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const SearchBar = ({ ...props }: InputGroupProps) => {
    const search = () => {
      console.log({ allProducts, searchPhrase });
      if (allProducts && originalProducts) {
        const fuse = new Fuse(originalProducts, { keys: ["name", "price"] });
        const output = fuse.search(searchPhrase);
        console.log(output);
        const filteredProduct: any[] = output.map((eachOutput) => {
          return eachOutput.item;
        });
        console.log(filteredProduct);
        if (setAllProducts && filteredProduct.length > 0) {
          setAllProducts(filteredProduct);
        } else if (setAllProducts) {
          setAllProducts(originalProducts);
        }
      }
    };

    return (
      <InputGroup color="gray" display="flex" {...props}>
        <CustomField
          key={1}
          ref={inputRef}
          flex="0.78"
          placeholder="Search"
          value={searchPhrase}
          backgroundColor="white"
          borderWidth="0"
          borderLeftRadius="md"
          borderRightRadius={width >= 700 ? "none" : "md"}
          onChange={(e: any) => {
            setSearchBarAutoFocus(true);
            setSearchPhrase(e.target.value);
            search();
            inputRef.current?.focus();
          }}
          onBlur={(e: any) => {
            if (e.target.value === "" && originalProducts && setAllProducts) {
              setAllProducts(originalProducts);
            }
          }}
          autoFocus={searchBarAutoFocus}
          height="4.2%"
          minHeight="2.5em"
          color="primary.900"
        />
        {width >= 700 ? (
          <InputRightAddon
            flex="1"
            backgroundColor="secondary.200"
            height="4.2%"
            minHeight="2.5em"
            color="white"
            borderColor="secondary.200"
            position="relative"
            cursor="pointer"
          >
            <FaSearch />
          </InputRightAddon>
        ) : (
          <></>
        )}
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
                onClick={() => window.location.assign("/checkout")}
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
          _focus={{
            outline: "none",
          }}
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
      backgroundColor="primary.800"
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
          flex="3"
          marginTop="0.7vh"
          cursor="pointer"
          onClick={() => window.location.assign("/")}
          isTruncated
        >
          Ecommerce Design
        </Heading>
        <SearchBar flex="4" marginTop="0.2%" marginLeft="-4%" />
        {width > 950 ? (
          <ShopIcons flex="1" marginTop="0.1em" marginLeft="5%" />
        ) : null}
        <LoginLink flex="1" marginTop="0.2em" />
      </Flex>
    </Box>
  );
};

export default Header;
