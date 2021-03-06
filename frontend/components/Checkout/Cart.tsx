import { Button, Text, Flex, Divider } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductContainer from "./ProductContainer";
import { deleteItemsFromCart, getCartItems } from "../../services/CartService";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

interface CartProps {
  proceed?: () => void;
}

const calculateTotalPrice = (cartItems: any) =>
  cartItems &&
  cartItems.reduce(
    (total: number, currentPrd: any) =>
      total + parseInt(currentPrd.total_price),
    0
  );

const Cart: React.FC<CartProps> = ({ proceed }) => {
  const { data: cartData } = useQuery("get-cart-items", getCartItems);
  const [cartItems, setCartItems] = useState<any[][]>([]);

  useEffect(() => {
    if (cartData) setCartItems(cartData);
  }, [cartData]);

  return (
    <Flex
      flexDirection="column"
      gridGap="3vh"
      padding="2rem 2rem 8rem 2rem"
      height="83vh"
    >
      {cartItems &&
        cartItems.map((prd: any) => (
          <Flex flexDirection="column" gridGap={20}>
            <ProductContainer
              product={prd}
              onDelete={async (productId) => {
                const res = await deleteItemsFromCart([productId]);
                if (res.status == 200) alert("Deleted !!");
              }}
              onChangeQuantity={(quantity) => {}}
            />
            <Divider orientation="horizontal" />
          </Flex>
        ))}
      <Flex flexDirection="row" justifyContent="right" mr="12%">
        Total Price :
        <Text fontWeight="bold" ml="1rem">
          {"\u20B9" +
            (calculateTotalPrice(cartItems) || "").toLocaleString("en-IN")}
        </Text>
      </Flex>
      <Divider orientation="horizontal" />
      <Flex
        flexDirection="row"
        gridGap="67rem"
        w="100%"
        position="absolute"
        bottom="2rem"
      >
        <Button
          variant="ghost"
          borderRadius="full"
          backgroundColor={`rgba(255,255,255, 0.1)`}
          onClick={() => window.location.assign("/shop")}
          padding="1%"
        >
          <Flex flexDirection="row" gridGap={3}>
            <IoIosArrowBack size={20} />
            <Text flex="1" fontSize="lg" mt="0%">
              Shop
            </Text>
          </Flex>
        </Button>
        <Button
          padding="1rem 2rem"
          variant="primarySolid"
          onClick={() => proceed && proceed()}
        >
          <Flex flexDirection="row" gridGap={3}>
            <Text>Checkout</Text>
            <IoIosArrowForward size={15} style={{ marginTop: "2%" }} />
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Cart;
