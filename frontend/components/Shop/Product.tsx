import { Container, Image, Text, Heading, Tag } from "@chakra-ui/react";
import React from "react";
import constants from "../../util/Constants";

interface Props {
  name: string;
  description: string;
  price: string;
  image: string;
}

const Product: React.FC<Props> = ({ name, description, price, image }) => {
  return (
    <Container
      height="inherit"
      width="30em"
      boxShadow="0.2em 0.2em 0.2em 0.2em #e1e1e1"
      padding="0"
    >
      <Image
        padding="1.5em"
        objectFit="scale-down"
        src={`${constants.url?.substring(
          0,
          constants?.url.lastIndexOf("/")
        )}${image}`}
        width="full"
        height="20em"
      />
      <Container width="full" height="initial" padding="1.5em">
        <Heading fontWeight="bold">{name}</Heading>
        <Text color="#2c2c2c">{description}</Text>
        <Tag
          size="md"
          bgColor="#9D84B7"
          textColor="white"
          marginTop="2em"
          marginLeft="27em"
        >
          <Text fontWeight="bold">₹{price}</Text>
        </Tag>
      </Container>
    </Container>
  );
};

export default Product;
