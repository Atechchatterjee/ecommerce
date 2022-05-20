import { useColorModeValue, Link, LinkProps } from "@chakra-ui/react";
import { ReactNode, MouseEventHandler } from "react";

interface NavLinkProps extends LinkProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}

const NavLink: React.FC<NavLinkProps> = ({ children, onClick, ...props }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("#212C6B", "#212C6B"),
    }}
    onClick={onClick}
    {...props}
  >
    {children}
  </Link>
);

export default NavLink;
