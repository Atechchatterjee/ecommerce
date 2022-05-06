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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logout from "../../util/Logout";
import { useRouter } from "next/router";

interface NavLinkProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}

const Links = [
  "Dashboard",
  "Purchase",
  ["Catalogs", "Product", "Category", "All-Products", "Add-Units", "Enter-GST"],
  "Orders",
  "Customers",
];

const NavLink: React.FC<NavLinkProps> = ({ children, onClick }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("#212C6B", "#212C6B"),
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
      <Box bgColor="primary.800" textColor="white" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            backgroundColor="primary.500"
            _hover={{ backgroundColor: "primary.500" }}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Admin Panel</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => {
                return Array.isArray(link) ? (
                  <NavLink key={link[0]}>
                    <Menu autoSelect={false}>
                      <MenuButton
                        key={link[0]}
                        rounded={"full"}
                        cursor={"pointer"}
                        minW={0}
                      >
                        {link[0]}
                      </MenuButton>
                      <MenuList
                        bg="primary.500"
                        borderColor="primary.500"
                        zIndex={11}
                      >
                        {link.slice(1).map((item) => (
                          <MenuItem
                            key={item}
                            _hover={{ bg: "#212C6B" }}
                            onClick={() =>
                              router.push(
                                `/admin/${link[0].toLowerCase()}/${item.toLowerCase()}`
                              )
                            }
                          >
                            {item}
                          </MenuItem>
                        ))}
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
            <Menu autoSelect={false}>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
                autoFocus={false}
              >
                <Avatar size={"sm"} />
              </MenuButton>
              <MenuList bg="#091353" borderColor="#212C6B" zIndex={11}>
                <MenuItem _hover={{ bg: "#212C6B" }}>Profile</MenuItem>
                <MenuDivider />
                <MenuItem
                  _hover={{ bg: "#212C6B" }}
                  onClick={() => logout({ admin: true })}
                >
                  logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) =>
                Array.isArray(link) ? (
                  <NavLink key={link[0]}>{link[0]}</NavLink>
                ) : (
                  <NavLink key={link}>{link}</NavLink>
                )
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
