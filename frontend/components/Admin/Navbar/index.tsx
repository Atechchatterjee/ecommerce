import { Box, useDisclosure } from "@chakra-ui/react";
import NavbarMobileView from "./NavbarMobileView";
import NavbarDesktopView from "./NavbarDesktopView";

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bgColor="primary.800" textColor="white" px={4}>
      <NavbarDesktopView {...{ isOpen, onOpen, onClose }} />
      <NavbarMobileView isOpen={isOpen} />
    </Box>
  );
};

export default Navbar;
