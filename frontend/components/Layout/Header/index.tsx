import { useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/layout";
import { Image, Tooltip } from "@chakra-ui/react";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { FaShoppingCart } from "react-icons/fa";
import { useCategoryData } from "../../../hooks/useCategoryData";
import { MdEmail } from "react-icons/md";
import { CategoryNode } from "../../../util/Tree";
import { AiFillShopping } from "react-icons/ai";
import CategorySidebar from "../../Widgets/CategorySidebar";
import CategoryBar from "./CategoryBar";
import SearchBar from "./SearchBar";
import LoginLink from "./LoginLink";

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
  const [allProducts, setAllProducts] = products || [[], (_: any[]) => {}];
  const [searchBarAutoFocus, setSearchBarAutoFocus] = useState<boolean>(false);
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  const [, , categoryTree] = useCategoryData({
    returnTree: true,
  });
  const [width] = useWindowDimensions();

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
        height="6em"
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
            <SearchBar
              searchBarAutoFocusState={[
                searchBarAutoFocus,
                setSearchBarAutoFocus,
              ]}
              productState={[allProducts, setAllProducts]}
              originalProducts={originalProducts}
              searchPhraseState={[searchPhrase, setSearchPhrase]}
            />
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
              <Box
                onClick={redirectToCheckout}
                _hover={{ color: "gray.400" }}
                transition="color ease-in-out 0.2s"
              >
                <FaShoppingCart size="20" style={{ cursor: "pointer" }} />
              </Box>
            </Tooltip>
            <Tooltip label="Shop">
              <Box
                onClick={redirectToShop}
                _hover={{ color: "gray.400" }}
                transition="color ease-in-out 0.2s"
              >
                <AiFillShopping size="20" style={{ cursor: "pointer" }} />
              </Box>
            </Tooltip>
            <Tooltip label="Contact Us">
              <Box
                onClick={redirectToContact}
                _hover={{ color: "gray.400" }}
                transition="color ease-in-out 0.2s"
              >
                <MdEmail size="20" style={{ cursor: "pointer" }} />
              </Box>
            </Tooltip>
          </Flex>
          {width > 700 && (
            <Box flex="1.0" textAlign="right">
              <LoginLink />
            </Box>
          )}
        </Flex>
      </Box>
      {!excludeCategoryBar && (
        <CategoryBar
          onClick={() => {
            setShowSideBar(!showSideBar);
          }}
        />
      )}
    </Box>
  );
};

export default Header;
