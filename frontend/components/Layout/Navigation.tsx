import { Flex, Link, Box, BoxProps } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";

interface NavigationProps extends BoxProps {
  colorMode?: "normal" | "blue";
  active?: number;
}

interface NavigationItem {
  id: number;
  text: string;
  link: string;
}

const Navigation = ({
  active,
  colorMode = "normal",
  ...props
}: NavigationProps) => {
  const navigationList: NavigationItem[] = [
    { id: 1, text: "Home", link: "/" },
    { id: 2, text: "Shop", link: "/shop" },
    { id: 3, text: "About", link: "/about" },
    { id: 4, text: "Contact", link: "/contact" },
    { id: 5, text: "Login", link: "/login" },
  ];
  const [activeLink, setActiveLink] = useState<number>(0);

  useEffect(() => setActiveLink(active || 0), [active]);

  const normalMode = () => colorMode == "normal";
  const isActive = (navigationItem: NavigationItem, id: number) =>
    navigationItem.id === id;

  return (
    <Box
      bg={normalMode() ? "gray.200" : "#4565C9"}
      borderBottomLeftRadius="lg"
      display="flex"
      justifyContent="center"
      {...props}
    >
      <Flex flexDirection="row" alignItems="center" w="95%">
        {navigationList.map((navigationItem) => (
          <NextLink href={`/${navigationItem.link}`}>
            <Link
              textAlign="center"
              flex="0.2"
              color={
                normalMode()
                  ? isActive(navigationItem, activeLink)
                    ? "#4565C9"
                    : ""
                  : isActive(navigationItem, activeLink)
                  ? "white"
                  : "gray.200"
              }
              fontWeight={isActive(navigationItem, activeLink) ? "bold" : ""}
              _hover={{
                color: normalMode() ? "#4565C9" : "white",
                fontWeight: "bold",
              }}
              onClick={() => setActiveLink(navigationItem.id)}
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
