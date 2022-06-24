import React from "react";
import {
  Image,
  FlexProps,
  Text,
  Box,
  HStack,
  Input,
  Flex,
} from "@chakra-ui/react";
import { CartItem } from "../../types/shop";
import { createImageUrl } from "../../util/CreateImageUrl";
import { CustomField } from "../Custom/CustomField";

interface ProductContainerProps extends FlexProps {
  product: CartItem;
}

const ProductContainer = ({ product, ...props }: ProductContainerProps) => {
  return (
    <Flex
      flexDirection="row"
      gridGap={40}
      h="7em"
      margin="1rem"
      width="100%"
      padding="1rem"
      {...(props as any)}
    >
      <Box flex="1">
        {product.images && (
          <Image
            w="5em"
            h="5em"
            src={createImageUrl(product.images[0].image, undefined)}
          />
        )}
      </Box>
      <Text mt="1.7rem" fontFamily="Sora" flex="1">
        {product.name}
      </Text>
      <Text mt="1rem" fontFamily="Sora" flex="1">
        {product.price[0].price}
        <Text fontSize="sm">/ {product.unit.value}</Text>
      </Text>
      <Input
        mt="1.7rem"
        value={product.quantity}
        flex="0.3"
        textAlign="center"
        type="number"
        focusBorderColor="secondary.200"
      />
      <Text mt="1.7rem" flex="1" fontFamily="Sora">
        {product.total_price}
      </Text>
    </Flex>
  );
};

export default ProductContainer;
