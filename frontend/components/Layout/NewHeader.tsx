import { Link, Flex, Image, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImSearch } from "react-icons/im";

const Header = () => {
  return (
    <Flex
      flexDirection="row"
      w="100%"
      h="8vh"
      bg="primary.800"
      alignItems="center"
    >
      <Image src="CND_logo.jpg" maxW="6rem" maxH="3rem" ml="1rem" flex="1" />
      <Flex
        color="white"
        gridGap="1.8rem"
        ml="1rem"
        flex="1"
        justifyContent="center"
        textUnderlineOffset="0.1rem"
      >
        <NextLink href="/">
          <Link>Home</Link>
        </NextLink>
        <NextLink href="/shop">
          <Link>Shop</Link>
        </NextLink>
        <NextLink href="/about">
          <Link>About</Link>
        </NextLink>
        <NextLink href="/contact">
          <Link>Contact</Link>
        </NextLink>
      </Flex>
      <Flex mr="1rem" gridGap="0.7rem">
        <Button variant="primarySolid">
          <ImSearch />
        </Button>
        <Button variant="primarySolid">
          <FaShoppingCart />
        </Button>
        <Button variant="primarySolid">
          <GiHamburgerMenu />
        </Button>
        <NextLink href="/login">
          <Button variant="primarySolid" ml="1.5rem">
            Login
          </Button>
        </NextLink>
      </Flex>
    </Flex>
  );
};

export default Header;
