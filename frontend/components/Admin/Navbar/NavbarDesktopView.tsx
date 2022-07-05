import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Flex,
  HStack,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  MenuDivider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import logout from "../../../util/Logout";
import CustomContainer from "../../Custom/CustomContainer";
import { Links } from "./Links";
import NavLink from "./NavLink";

interface NavbarDesktopViewProps {
  isOpen: boolean;
  onOpen: Function;
  onClose: Function;
}

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

const NavbarDesktopView = ({
  isOpen,
  onOpen,
  onClose,
}: NavbarDesktopViewProps) => {
  const router = useRouter();

  return (
    <Flex h={16} alignItems="center" justifyContent="space-between">
      <ExpandButtonForMobileView {...{ isOpen, onOpen, onClose }} />
      <HStack spacing={8} alignItems="center">
        <Box fontWeight="semibold" fontFamily="Sora" fontSize="lg">
          Cnd Ekart
        </Box>
        <HStack
          as={"nav"}
          spacing={4}
          display={{ base: "none", md: "flex" }}
          justifyContent="right"
        >
          {Links.map((link) => {
            return link.children ? (
              <NavLink key={link.label}>
                <Menu autoSelect={false}>
                  <MenuButton
                    key={link.label}
                    rounded="full"
                    cursor="pointer"
                    fontSize="sm"
                    minW={0}
                  >
                    {link.label.toUpperCase()}
                  </MenuButton>
                  <CustomContainer>
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
                  </CustomContainer>
                </Menu>
              </NavLink>
            ) : (
              <NavLink
                key={link.label}
                onClick={() => {
                  router.push(`/admin/${link.href}`);
                }}
                fontSize="sm"
              >
                {link.label.toUpperCase()}
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
  );
};

export default NavbarDesktopView;
