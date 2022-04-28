import React, { useEffect, useState } from "react";
import { Box, Link, LinkProps, Grid, GridItem, Flex } from "@chakra-ui/layout";
import { InputGroup, InputGroupProps, InputRightAddon } from "@chakra-ui/input";
import { Button, ButtonProps } from "@chakra-ui/react";
import { isAuthenticated } from "../../util/Authenticated";
import logout from "../../util/Logout";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { FaSearch } from "react-icons/fa";
import { CustomField } from "../Custom/CustomField";
import Fuse from "fuse.js";
import CategorySidebar from "../Widgets/CategorySidebar";
import { useCategoryData } from "../../hooks/useCategoryData";
import { MdMenu } from "react-icons/md";

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
        padding="3.5%"
        borderRadius="md"
        onClick={() => {
          setShowSideBar(!showSideBar);
        }}
        {...props}
      >
        <MdMenu size="20" />
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
      <CategorySidebar
        minWidth="20em"
        categoryTree={categoryTree}
        open={showSideBar}
        closeCb={() => setShowSideBar(false)}
        zIndex={9}
      />
      <Box
        width="full"
        className="header-up"
        height="4.4rem"
        position="fixed"
        backgroundColor="primary.800"
        zIndex={10}
        color="white"
        padding="0.7%"
        overflow="hidden"
      >
        <Flex
          flexDirection="row"
          gridGap="10"
          padding="1%"
          height="full"
          alignItems="center"
        >
          <Box flex="2" textAlign="left" ml="-0.5%">
            <HamburgerButton />
          </Box>
          <Box flex="5">
            <SearchBar />
          </Box>
          <Box flex="2.5" textAlign="right">
            <LoginLink />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
