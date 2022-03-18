import React from "react";
import { Heading, Box, Center, BoxProps } from "@chakra-ui/layout";
import { string } from "yup";

interface BannerProps extends BoxProps {
  text: string;
  textColor?: string;
}

const Banner = ({ text, textColor, ...props }: BannerProps) => {
  return (
    <Box height="15em" backgroundColor="primary.800" {...props}>
      <Center>
        <Heading
          as="h1"
          color={textColor || "white"}
          marginTop="2.5em"
          fontFamily="Montserrat"
          isTruncated
        >
          {text}
        </Heading>
      </Center>
    </Box>
  );
};

export default Banner;
