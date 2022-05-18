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
  LinkOverlay,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logout from "../../util/Logout";
import { useRouter } from "next/router";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { AnimatePresence, motion } from "framer-motion";

interface NavLinkProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}

const Links = [
  { label: "Dashboard", href: "dashboard" },
  { label: "Customers", href: "customers" },
  {
    label: "Catalogs",
    href: "catalogs",
    children: [
      { label: "Product", href: "product" },
      { label: "Category", href: "category" },
      { label: "All Products", href: "all-products" },
      { label: "Add Units", href: "add-units" },
      { label: "Enter GST", href: "enter-gst" },
    ],
  },
  { label: "Orders", href: "orders" },
  { label: "Customers", href: "customers" },
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

const ExpandButtonForMobileView = ({ isOpen, onOpen, onClose }: any) => {
  return (
    <IconButton
      size={"md"}
      backgroundColor="primary.500"
      _hover={{ bg: "primary.500" }}
      icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
      _active={{ bg: "primary.100" }}
      aria-label={"Open Menu"}
      display={{ md: "none" }}
      onClick={isOpen ? onClose : onOpen}
    />
  );
};

const NavbarMobileView = ({ isOpen }: any) => {
  if (isOpen)
    return (
      <AnimatePresence>
        <motion.div
          key="modal"
          initial={{ y: -20, opacity: "0.4" }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}
        >
          <Box
            pb={4}
            display={{ md: "none" }}
            transition="all ease-in-out 0.5s"
          >
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) =>
                link.children ? (
                  <NavLink
                    key={link.label}
                    onClick={() => {
                      window.location.assign(`/admin/${link.href}`);
                    }}
                  >
                    {link.label}
                  </NavLink>
                ) : (
                  <NavLink
                    key={link.label}
                    onClick={() => {
                      window.location.assign(`/admin/${link.href}`);
                    }}
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </Stack>
          </Box>
        </motion.div>
      </AnimatePresence>
    );
  else return <></>;
};

const Navbar: React.FC = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bgColor="primary.800" textColor="white" px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <ExpandButtonForMobileView {...{ isOpen, onOpen, onClose }} />
        <HStack spacing={8} alignItems={"center"}>
          <Box>Admin Panel</Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => {
              return link.children ? (
                <NavLink key={link.label}>
                  <Menu autoSelect={false}>
                    <MenuButton
                      key={link.label}
                      rounded="full"
                      cursor="pointer"
                      minW={0}
                    >
                      {link.label}
                    </MenuButton>
                    <MenuList
                      bg="primary.500"
                      borderColor="primary.500"
                      zIndex={11}
                    >
                      {link.children?.map((item) => (
                        <MenuItem
                          key={item.label}
                          _hover={{ bg: "#212C6B" }}
                          onClick={() =>
                            router.push(`/admin/${link.href}/${item.href}`)
                          }
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </NavLink>
              ) : (
                <NavLink
                  key={link.label}
                  onClick={() => {
                    router.push(`/admin/${link.href}`);
                  }}
                >
                  {link.label}
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

      <NavbarMobileView isOpen={isOpen} />
    </Box>
  );
};

export default Navbar;
