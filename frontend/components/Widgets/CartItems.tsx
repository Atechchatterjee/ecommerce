import React, { useEffect, useState } from "react";
import axios from "axios";
import constants from "../../util/Constants";
import { Flex, Text } from "@chakra-ui/react";
import { Product as ProductType } from "../../types/shop";

const CartItems = () => {
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const getCartItems = async (): Promise<any[]> => {
    return new Promise((resolve) => {
      axios
        .get(`${constants.url}/shop/get-products-from-cart/`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.cart_items);
          resolve(res.data.cart_items);
        })
        .catch((err) => console.error(err));
    });
  };

  useEffect(() => {
    getCartItems().then((products) => setCartItems(products));
  }, []);

  return (
    <Flex flexDirection="column">
      {cartItems.map((product) => (
        <Text>{product.name}</Text>
      ))}
    </Flex>
  );
};

export default CartItems;
