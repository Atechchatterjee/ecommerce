import {
  Text,
  Box,
  Collapse,
  Stack,
  VStack,
  Flex,
  keyframes,
} from "@chakra-ui/react";
import { useState } from "react";
import { Links, LinkProps } from "./Links";
import NavLink from "./NavLink";
import { ChevronDownIcon } from "@chakra-ui/icons";

const NavbarMobileSubView = ({
  isOpen,
  currentNode,
}: {
  isOpen: boolean;
  currentNode: LinkProps;
}) => {
  return (
    <Collapse in={isOpen}>
      <VStack alignItems="left" ml="1rem">
        {currentNode &&
          currentNode.children?.map((link: any) => (
            <NavLink
              key={link.label}
              padding="0.5rem"
              onClick={() => {
                window.location.assign(
                  `/admin/${currentNode.href}/${link.href}`
                );
              }}
              userSelect="none"
            >
              {link.label}
            </NavLink>
          ))}
      </VStack>
    </Collapse>
  );
};

const NavbarMobileView = ({ isOpen }: { isOpen: boolean }) => {
  const [openedSubMenu, setOpenedSubMenu] = useState<{
    [key: string]: boolean;
  }>({});

  return (
    <Collapse in={isOpen}>
      <Box pb={4} display={{ md: "none" }} transition="all ease-in-out 0.5s">
        <Stack as={"nav"} spacing={4} w="100%">
          {Links.map((link) =>
            link.children ? (
              <>
                <NavLink
                  key={link.label}
                  padding="0.5rem"
                  onClick={() => {
                    setOpenedSubMenu({
                      [link.label]: openedSubMenu
                        ? !openedSubMenu[link.label]
                        : true,
                    });
                  }}
                  userSelect="none"
                  w="100%"
                >
                  <Flex w="100%">
                    <Text flex="1">{link.label}</Text>
                    <ChevronDownIcon
                      color="white"
                      fontSize="xl"
                      mt="0.15rem"
                      mr="0.3rem"
                    />
                  </Flex>
                </NavLink>
                <NavbarMobileSubView
                  isOpen={!!openedSubMenu[link.label]}
                  currentNode={link}
                />
              </>
            ) : (
              <NavLink
                key={link.label}
                padding="0.5rem"
                onClick={() => {
                  window.location.assign(`/admin/${link.href}`);
                }}
                userSelect="none"
              >
                {link.label}
              </NavLink>
            )
          )}
        </Stack>
      </Box>
    </Collapse>
  );
};

export default NavbarMobileView;
