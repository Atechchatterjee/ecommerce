import { Flex, Link, Box, BoxProps } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface NavigationProps extends BoxProps {
  colorMode?: "normal" | "blue";
}

const Navigation = ({ colorMode = "normal", ...props }: NavigationProps) => {
  const navigationList: { text: string; link: string }[] = [
    { text: "Home", link: "/" },
    { text: "Shop", link: "/shop" },
    { text: "About", link: "/about" },
    { text: "Contact", link: "/contact" },
    { text: "Login", link: "/login" },
  ];

  const normalMode = () => colorMode == "normal";

  return (
    <Box
      bg={normalMode() ? "gray.200" : "#4565C9"}
      borderBottomLeftRadius="lg"
      display="flex"
      {...props}
    >
      <Flex flexDirection="row" padding="1rem 0.5rem" width="inherit">
        {navigationList.map((navigationItem) => (
          <NextLink href={`/${navigationItem.link}`}>
            <Link
              textAlign="center"
              flex="0.2"
              color={normalMode() ? "" : "gray.200"}
              _hover={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              {navigationItem.text}
            </Link>
          </NextLink>
        ))}
      </Flex>
    </Box>
  );
};

export default Navigation;
