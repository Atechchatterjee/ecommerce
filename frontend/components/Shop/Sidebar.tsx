import { Flex, FlexProps, Text } from "@chakra-ui/react";
import React from "react";
import { FaFilter } from "react-icons/fa";

const Sidebar = ({ ...props }: FlexProps) => {
  const Heading = ({ icon: Icon, text }: { icon: any; text: string }) => {
    return (
      <Flex
        flexDirection="row"
        gridGap="1rem"
        justifyContent="center"
        padding="1rem"
        bg="secondary.200"
        alignItems="center"
        w="100%"
        h="4rem"
      >
        <Icon color="white" />
        <Text color="white" fontFamily="Sora">
          {text}
        </Text>
      </Flex>
    );
  };

  return (
    <Flex
      flexDirection="row"
      gridGap="1rem"
      bg="primary.800"
      h="100vh"
      {...props}
    >
      <Heading icon={FaFilter} text="Filter By" />
    </Flex>
  );
};

export default Sidebar;
