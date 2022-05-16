import React, { useEffect, useState } from "react";
import {
  Box,
  Link,
  Text,
  LinkProps,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/layout";
import { InputGroup, InputGroupProps, InputRightAddon } from "@chakra-ui/input";
import {
  Button,
  ButtonProps,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import { isAuthenticated } from "../../util/Authenticated";
import logout from "../../util/Logout";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { CustomField } from "../Custom/CustomField";
import Fuse from "fuse.js";
import CategorySidebar from "../Widgets/CategorySidebar";
import { useCategoryData } from "../../hooks/useCategoryData";
import { MdEmail, MdMenu, MdStayPrimaryLandscape } from "react-icons/md";
import { CategoryNode } from "../../util/Tree";
import { scrollBarStyle } from "../../util/ScrollBarStyle";
import { AiFillShopping } from "react-icons/ai";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface HeaderProps {
  products?: [any[], (_: any[]) => void];
  originalProducts?: any[];
  excludeCategoryBar?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  excludeCategoryBar,
  products,
  originalProducts,
}) => {
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
      <Tooltip label="All Categories">
        <Button
          variant="unstyled"
          _focus={{ outline: "none", outlineWidth: "0" }}
          _hover={{ color: "white" }}
          padding="3.5%"
          borderRadius="md"
          textAlign="center"
          alignContent="center"
          onClick={() => {
            setShowSideBar(!showSideBar);
          }}
          {...props}
        >
          <MdMenu size="20" />
        </Button>
      </Tooltip>
    );
  };

  const SearchBar = ({ ...props }: InputGroupProps) => {
    const search = () => {
      if (allProducts && originalProducts) {
        const fuse = new Fuse(originalProducts, {
          keys: ["name", "price"],
          fieldNormWeight: 1,
        });
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

  const DisplayCategories = ({ cur }: { cur: CategoryNode }): any[] => {
    if (cur.children.length === 0) return [];
    return cur.children.map((child: CategoryNode) => {
      return (
        <>
          <Text
            key={child.val.id}
            fontFamily="Sora"
            fontSize="0.9em"
            cursor="pointer"
            _hover={{ color: "white" }}
          >
            {child.val.name}
          </Text>
          {DisplayCategories({ cur: child })}
        </>
      );
    });
  };

  const redirectToShop = () => window.location.assign("/shop");
  const redirectToCheckout = () => window.location.assign("/checkout");
  const redirectToContact = () => window.location.assign("/contact");

  const CategoryBar = () => {
    return (
      <Box zIndex="-1">
        <Box
          className="sub-header"
          sx={scrollBarStyle({ hidden: true })}
          height="7.4rem"
          overflow="scroll"
          justifyItems="center"
          bgColor="primary.200"
          color="gray.300"
        >
          <Flex
            flexDirection="row"
            gridGap={10}
            w="max-content"
            paddingTop="5.2rem"
            flexWrap="nowrap"
            textAlign="justify"
          >
            <Box flex="0.1">
              <HamburgerButton mt="-25%" ml="40%" />
            </Box>
            {categoryTree && DisplayCategories({ cur: categoryTree.root })}
          </Flex>
        </Box>
      </Box>
    );
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
        height="4.4em"
        position="fixed"
        backgroundColor="primary.800"
        zIndex={10}
        color="white"
        padding="0.7rem"
        overflow="hidden"
      >
        <Flex
          flexDirection="row"
          gridGap="10"
          padding="1rem"
          height="full"
          alignItems="center"
        >
          {width > 700 && (
            <Box flex="2.3" textAlign="left">
              <Image src="/CND_logo.jpg" w="6rem" h="2.7em" cursor="pointer" />
            </Box>
          )}
          <Box flex="5">
            <SearchBar />
          </Box>
          <Flex
            flex="1.5"
            textAlign="right"
            flexDirection="row"
            gridGap="5"
            justifyContent="right"
            alignItems="center"
            display={width > 700 ? "flex" : "none"}
          >
            <Tooltip label="Cart">
              <Box onClick={redirectToCheckout}>
                <FaShoppingCart size="20" style={{ cursor: "pointer" }} />
              </Box>
            </Tooltip>
            <Tooltip label="Shop">
              <Box onClick={redirectToShop}>
                <AiFillShopping size="20" style={{ cursor: "pointer" }} />
              </Box>
            </Tooltip>
            <Tooltip label="Contact Us">
              <Box onClick={redirectToContact}>
                <MdEmail size="20" style={{ cursor: "pointer" }} />
              </Box>
            </Tooltip>
          </Flex>
          {width > 700 && (
            <Box flex="0.5" textAlign="right">
              <LoginLink />
            </Box>
          )}
        </Flex>
      </Box>
      {!excludeCategoryBar && <CategoryBar />}
    </Box>
  );
};

export default Header;
