import { Box, Button, Text, Flex, Grid, GridItem } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
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
          cartItems.map((prd: any) => <ProductContainer product={prd} />)}
      </GridItem>
      <GridItem rowSpan={1} colSpan={16} textAlign="left">
        <Box>
          <Button
            variant="primaryOutline"
            borderRadius="full"
            backgroundColor={`rgba(255,255,255, 0.1)`}
            onClick={() => window.location.assign("/shop")}
          >
            <Flex flexDirection="row" gridGap={1.5}>
              <IoIosArrowBack size={20} />
              <Text flex="1">Back</Text>
            </Flex>
          </Button>
        </Box>
      </GridItem>

      <GridItem rowSpan={1} colSpan={4} textAlign="right">
        <Flex flexDirection="row" gridGap="2" width="full">
          <Button
            flex="1"
            marginLeft="1em"
            variant="primarySolid"
            onClick={() => proceed && proceed()}
          >
            Proceed
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Cart;
