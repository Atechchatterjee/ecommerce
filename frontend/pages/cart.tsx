import { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import WithAuth from "../util/WithAuth";
import { Box, Button, Container, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import constants from "../util/Constants";
import CustomTable from "../components/Custom/CustomTable";

const createImageUrl = (url: string, image: File | undefined): string =>
  image
    ? URL.createObjectURL(image)
    : `${constants.url?.substring(0, constants?.url.lastIndexOf("/"))}${url}`;

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

const scrollBarStyle = {
  "&::-webkit-scrollbar": {
    width: "7px",
    height: "0.5em",
    borderRadius: "7px",
  },
  "&::-webkit-scrollbar-track": {
    display: "none",
  },
  "&::-webkit-scrollbar-thumb": {
    width: "2px",
    height: "1em",
    borderRadius: "7px",
    backgroundColor: `#CAB6E5`,
    transition: "background-color 0.8s ease-in-out",
  },
};

const Cart: NextPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const heading = ["Image", "product name", "price", "quantity", "total price"];
  const [finalPrice, setFinalPrice] = useState<number>(0);

  useEffect(() => {
    let finalPriceCalc = 0;
    getCartItems().then((items) => {
      setCartItems([
        ...items.map((item, indx) => {
          finalPriceCalc += parseInt(item.total_price);
          return [
            indx,
            <Image
              src={createImageUrl(item.images[0].image, undefined)}
              w="20"
              h="20"
              objectFit="contain"
            />,
            item.name,
            item.price,
            item.quantity,
            <Text color="blueSolid.200" fontWeight="semibold">
              {item.total_price}
            </Text>,
          ];
        }),
      ]);
      setFinalPrice(finalPriceCalc);
    });
  }, []);

  return (
    <Box
      bgGradient="linear(to-b, secondaryBlue.200, secondaryPink.200)"
      width="100%"
      height="100vh"
      position="relative"
    >
      <Text
        fontSize="2.1em"
        fontWeight="semibold"
        color="white"
        textAlign="center"
        paddingTop="0.5em"
        fontFamily="Sora"
      >
        Cart Items
      </Text>
      <Container
        borderRadius="lg"
        textAlign="center"
        width="100%"
        maxWidth="75%"
        bgColor="white"
        height="85vh"
        marginTop="1.5em"
        position="relative"
        overflowY="scroll"
        sx={scrollBarStyle}
      >
        <CustomTable
          top="2em"
          position="absolute"
          width="95%"
          heading={heading}
          rows={cartItems}
          select
        />
        <Button
          variant="blueGradient"
          position="absolute"
          right="2em"
          bottom="1.5em"
        >
          Proceed
        </Button>
        <Box fontWeight="semibold" bottom="1.5em" position="absolute">
          Final Price :
          <Text
            marginLeft="0.8em"
            float="right"
            textColor="secondaryBlue.200"
            fontWeight="semibold"
          >
            {finalPrice}
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default WithAuth(Cart);
