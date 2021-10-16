import { MouseEventHandler, ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logout from "../../util/Logout";
import { useRouter } from "next/router";

interface NavLinkProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}

const Links = ["Dashboard", "Purchase", "Catalogs", "Orders", "Customers"];

const NavLink: React.FC<NavLinkProps> = ({ children, onClick }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    onClick={onClick}
  >
    {children}
  </Link>
);

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Ecommerce Desgin</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => {
                return link == "Catalogs" ? (
                  <NavLink key={link}>
                    <Menu>
                      <MenuButton
                        rounded={"full"}
                        variant={"link"}
                        cursor={"pointer"}
                        minW={0}
                      >
                        {link}
                      </MenuButton>
                      <MenuList>
                        <MenuItem>Products</MenuItem>
                        <MenuItem>Category</MenuItem>
                      </MenuList>
                    </Menu>
                  </NavLink>
                ) : (
                  <NavLink
                    key={link}
                    onClick={() => router.push(`/admin/${link.toLowerCase()}`)}
                  >
                    {link}
                  </NavLink>
                );
              })}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => logout({ admin: true })}>
                  logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
