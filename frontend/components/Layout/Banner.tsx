import React from "react";
import { Heading, Center } from "@chakra-ui/layout";

const Banner: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div style={{ height: "10em", backgroundColor: "#EEEEEE" }}>
      <Center>
        <Heading
          as="h1"
          color="#333333"
          marginTop="1.6em"
          fontFamily="Sora"
          isTruncated
        >
          {text}
        </Heading>
      </Center>
    </div>
  );
};

export default Banner;
