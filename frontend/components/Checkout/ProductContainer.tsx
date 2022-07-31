import React, { ChangeEvent, useEffect, useState } from "react";
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
import { RUPEE_SYMBOL } from "../../util/Symbols";
import Show from "../Custom/Show";

interface ProductContainerProps extends FlexProps {
  product: CartItem;
  onDelete?: (productId: number) => void;
  onChangeQuantity?: (quantity: number) => void;
}

const ProductContainer = ({
  product,
  onDelete,
  onChangeQuantity,
  ...props
}: ProductContainerProps) => {
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    if (product) setQuantity(product.quantity);
  }, [product]);

  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement> | undefined
  ) => {
    const newQuantity: string = e?.target.value || "";

    setQuantity(parseInt(newQuantity));
    if (onChangeQuantity && newQuantity)
      onChangeQuantity(parseInt(newQuantity));
  };

  return (
    <Flex
      flexDirection="row"
      gridGap={30}
      maxH="2em"
      width="100%"
      {...(props as any)}
    >
      <Box flex="1">
        <Show when={!!product.images}>
          <Image
            w="5em"
            h="5em"
            objectFit="contain"
            src={createImageUrl(product.images[0].image, undefined)}
          />
        </Show>
      </Box>
      <Text mt="1.7rem" fontFamily="Sora" flex="1">
        {product.name}
      </Text>
      <Text mt="1.7rem" fontFamily="Sora" flex="1.5">
        <Flex flexDirection="row" gridGap={2} justifyContent="center">
          {RUPEE_SYMBOL +
            parseInt(product.price[0].price).toLocaleString("en-IN")}
          <Show when={product.unit}>
            <Text fontSize="sm" fontStyle="italic" mt="0.2rem">
              / {product.unit.value}
            </Text>
          </Show>
        </Flex>
      </Text>
      <Input
        mt="1.2rem"
        value={quantity}
        flex="0.3"
        textAlign="center"
        type="number"
        focusBorderColor="secondary.200"
        onChange={handleQuantityChange}
      />
      <Text
        mt="1.7rem"
        flex="1"
        fontFamily="Sora"
        fontWeight="semibold"
        color="primary.500"
      >
        {RUPEE_SYMBOL + parseInt(product.total_price).toLocaleString("en-IN")}
      </Text>
      <CloseButton
        margin="1.5% 1.5% 0 0"
        _focus={{ outline: "none" }}
        onClick={() => onDelete && onDelete(product.product_id)}
      />
    </Flex>
  );
};

export default ProductContainer;
