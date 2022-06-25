import {
  Box,
  Button,
  Text,
  Flex,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductContainer from "./ProductContainer";
import { getCartItems } from "../../services/CartService";
import { useQuery } from "react-query";

interface CartProps {
  proceed?: () => void;
}

const Cart: React.FC<CartProps> = ({ proceed }) => {
  const { data: cartItems } = useQuery("get-cart-items", getCartItems);

  return (
    <Grid
      padding="1% 2% 0 2%"
      templateRows="repeat(20, 1fr)"
      templateColumns="repeat(20, 1fr)"
      gap="9"
    >
      <GridItem rowSpan={20} colSpan={20}>
        {cartItems &&
          cartItems.map((prd: any) => (
            <>
              <ProductContainer product={prd} />
              <Divider orientation="horizontal" />
            </>
          ))}
      </GridItem>
      <GridItem rowSpan={1} colSpan={16} textAlign="left">
        <Box>
          <Button
            variant="ghost"
            borderRadius="full"
            backgroundColor={`rgba(255,255,255, 0.1)`}
            onClick={() => window.location.assign("/shop")}
            padding="2%"
          >
            <Flex flexDirection="row" gridGap={3}>
              <IoIosArrowBack size={20} />
              <Text flex="1" fontSize="lg" mt="0%">
                Shop
              </Text>
            </Flex>
          </Button>
        </Box>
      </GridItem>

      <GridItem rowSpan={1} colSpan={4} textAlign="right">
        <Button
          padding="1rem 1.5rem"
          variant="primarySolid"
          onClick={() => proceed && proceed()}
        >
          <Flex flexDirection="row" gridGap={3}>
            <Text>Checkout</Text>
            <IoIosArrowForward size={15} style={{ marginTop: "2%" }} />
          </Flex>
        </Button>
      </GridItem>
    </Grid>
  );
};

export default Cart;
