import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Link,
  LinkProps,
  Flex,
  BoxProps,
  Grid,
  GridItem,
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
import { useCategoryData } from "../../hooks/useCategoryData";
import { motion, AnimatePresence } from "framer-motion";

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
  const [, , categoryTree] = useCategoryData({
    returnTree: true,
  });

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
        variant="blurSolid"
        borderRadius="md"
        onClick={() => {
          setShowSideBar(!showSideBar);
        }}
        {...props}
      >
        <GiHamburgerMenu size={16} />
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
      if (e.target.value.length > 0) {
        search();
      } else if (setAllProducts && originalProducts) {
        setAllProducts(originalProducts);
      }
    };

    return (
      <InputGroup color="gray" display="flex" {...props}>
        <CustomField
          key={1}
          flex="0.78"
          placeholder="Search"
          value={searchPhrase}
          backgroundColor="primary.200"
          opacity="0.7"
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
            border="none"
            position="relative"
            cursor="pointer"
            opacity="0.7"
          >
            <FaSearch />
          </InputRightAddon>
        ) : (
          <></>
        )}
      </InputGroup>
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
    <Box>
      <AnimatePresence>
        {showSideBar && categoryTree ? (
          <motion.div
            style={{
              position: "fixed",
              zIndex: 9,
              width: "100%",
              padding: "0",
              marginTop: "4.5%",
            }}
            key="modal"
            animate={{ x: 3, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CategorySidebar categoryTree={categoryTree} zIndex={9} />
          </motion.div>
        ) : (
          <></>
        )}
      </AnimatePresence>
      <Box
        width="full"
        className="header-up"
        height="7vh"
        position="fixed"
        backgroundColor="primary.800"
        zIndex={10}
        color="white"
        padding="0.7%"
        overflow="hidden"
      >
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(100, 1fr)"
          gap={10}
          width="100%"
          height="inherit"
        >
          <GridItem rowSpan={1} colSpan={10}>
            <HamburgerButton />
          </GridItem>
          <GridItem rowSpan={1} colSpan={25} marginTop="-0.2%">
            <SearchBar marginTop="0.2%" />
          </GridItem>
          <GridItem
            rowSpan={1}
            colSpan={12}
            display="flex"
            justifyItems="center"
            justifyContent="right"
          >
            <LoginLink marginTop="0.2em" />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default Header;
