import { Text, Button, BoxProps } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";

interface HambergerButtonProps extends Omit<BoxProps, "onClick"> {
  onClick?: () => void;
}

const HamburgerButton = ({ onClick, ...props }: HambergerButtonProps) => {
  return (
    <Button
      variant="unstyled"
      _focus={{ outline: "none", outlineWidth: "0" }}
      // padding="5%"
      borderRadius="md"
      textAlign="center"
      display="flex"
      flexDirection="row"
      gridGap="1rem"
      alignContent="center"
      // onClick={() => {
      //   setShowSideBar(!showSideBar);
      // }}
      onClick={onClick}
      {...(props as any)}
    >
      <MdMenu size="20" />
      <Text fontSize="lg">View Categories</Text>
    </Button>
  );
};

export default HamburgerButton;
