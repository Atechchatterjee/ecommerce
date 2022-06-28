import React from "react";
import {
  Image,
  FlexProps,
  Text,
  Box,
  Input,
  Flex,
  CloseButton,
} from "@chakra-ui/react";
import { CartItem } from "../../types/shop";
import { createImageUrl } from "../../util/CreateImageUrl";

interface ProductContainerProps extends FlexProps {
  product: CartItem;
  onDelete?: (productId: number) => void;
}

const ProductContainer = ({
  product,
  onDelete,
  ...props
}: ProductContainerProps) => {
  return (
    <Flex
      flexDirection="row"
      gridGap={30}
      maxH="2em"
      width="100%"
      {...(props as any)}
    >
      <Box flex="1">
        {product.images && (
          <Image
            w="5em"
            h="5em"
            objectFit="contain"
            src={createImageUrl(product.images[0].image, undefined)}
          />
        )}
      </Box>
      <Text mt="1.7rem" fontFamily="Sora" flex="1">
        {product.name}
      </Text>
      <Text mt="1.7rem" fontFamily="Sora" flex="1.5">
        <Flex flexDirection="row" gridGap={2} justifyContent="center">
          {"\u20B9" + parseInt(product.price[0].price).toLocaleString("en-IN")}
          {product.unit && (
            <Text fontSize="sm" fontStyle="italic" mt="0.2rem">
              / {product.unit.value}
            </Text>
          )}
        </Flex>
      </Text>
      <Input
        mt="1.2rem"
        value={product.quantity}
        flex="0.3"
        textAlign="center"
        type="number"
        focusBorderColor="secondary.200"
      />
      <Text
        mt="1.7rem"
        flex="1"
        fontFamily="Sora"
        fontWeight="semibold"
        color="primary.500"
      >
        {"\u20B9" + parseInt(product.total_price).toLocaleString("en-IN")}
      </Text>
      <CloseButton
        margin="1.5% 1.5% 0 0"
        _focus={{ outline: "none" }}
        onClick={() => {
          if (onDelete) onDelete(product.product_id);
        }}
      />
    </Flex>
  );
};

export default ProductContainer;
