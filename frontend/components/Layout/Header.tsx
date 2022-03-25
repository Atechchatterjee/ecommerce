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
import { Button, ButtonProps, Fade, Tooltip } from "@chakra-ui/react";
import { FaRegHeart, FaRegUser, FaHeart } from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";
import { isAuthenticated } from "../../util/Authenticated";
import logout from "../../util/Logout";
import { FiShoppingCart } from "react-icons/fi";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { FaSearch } from "react-icons/fa";
import { CustomField } from "../Custom/CustomField";
import Fuse from "fuse.js";
import { GiHamburgerMenu } from "react-icons/gi";
import CategorySidebar from "../Widgets/CategorySidebar";

interface HeaderProps {
  products?: [any[], (_: any[]) => void];
  originalProducts?: any[];
}

const Header: React.FC<HeaderProps> = ({ products, originalProducts }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [allProducts, setAllProducts] = products || [];
  const [searchBarAutoFocus, setSearchBarAutoFocus] = useState<boolean>(false);
  const [width] = useWindowDimensions();
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  useEffect(() => {
    isAuthenticated()
      .then(() => {
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }, []);

  const HamburgerButton = ({ ...props }: ButtonProps) => {
    return (
      <Button
        variant="secondarySolid"
        borderRadius="md"
        onClick={() => {
          setShowSideBar(!showSideBar);
        }}
        {...props}
      >
        <GiHamburgerMenu size={24} />
      </Button>
    );
  };

  const SearchBar = ({ ...props }: InputGroupProps) => {
    const search = () => {
      if (allProducts && originalProducts) {
        const fuse = new Fuse(originalProducts, { keys: ["name", "price"] });
        const output = fuse.search(searchPhrase);
        const filteredProduct: any[] = output.map(
          (eachOutput) => eachOutput.item
        );
        if (setAllProducts && filteredProduct.length > 0) {
          setAllProducts(filteredProduct);
        } else if (setAllProducts) {
          setAllProducts(originalProducts);
        }
      }
    };

    const handleSearchPhraseChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setSearchBarAutoFocus(true);
      setSearchPhrase(e.target.value);
      search();
    };

    return (
      <InputGroup color="gray" display="flex" {...props}>
        <CustomField
          key={1}
          flex="0.78"
          placeholder="Search"
          value={searchPhrase}
          backgroundColor="primary.200"
          borderWidth="0"
          borderLeftRadius="md"
          borderRightRadius={width >= 700 ? "none" : "md"}
          onChange={handleSearchPhraseChange}
          onBlur={(e: any) => {
            if (e.target.value === "" && originalProducts && setAllProducts) {
              setAllProducts(originalProducts);
            }
          }}
          _focus={{ border: "none" }}
          autoFocus={searchBarAutoFocus}
          height="4.2%"
          minHeight="2.5em"
          color="white"
        />
        {width >= 700 ? (
          <InputRightAddon
            flex="1"
            backgroundColor="primary.200"
            height="4.2%"
            minHeight="2.5em"
            color="white"
            borderColor="primary.200"
            osition="relative"
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
    <>
      {showSideBar ? <CategorySidebar zIndex={9} /> : <></>}
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
          <HamburgerButton flex="0.1" />
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
    </>
  );
};

export default Header;
