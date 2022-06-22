import React from "react";
import { Image, Flex, FlexProps, Text } from "@chakra-ui/react";
import { CartItem } from "../../types/shop";
import { createImageUrl } from "../../util/CreateImageUrl";

interface ProductContainerProps extends FlexProps {
  product: CartItem;
}

const ProductContainer = ({ product, ...props }: ProductContainerProps) => {
  return (
    <>
      <Flex flexDirection="row" gridGap={4} margin="1rem" {...(props as any)}>
        {product.images && (
          <Image
            src={createImageUrl(product.images[0].image, undefined)}
            w="5em"
            h="5em"
          />
        )}
        <Text>{product.name}</Text>
        <Text>{product.price[0].price}</Text>
      </Flex>
    </>
  );
};

export default ProductContainer;
