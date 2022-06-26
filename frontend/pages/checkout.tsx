import { Box, Fade, ContainerProps } from "@chakra-ui/react";
import { NextPage } from "next";
import Cart from "../components/Checkout/Cart";
import WithAuth from "../util/WithAuth";
import { useState } from "react";
import Shipping from "../components/Checkout/Shipping";
import Head from "next/head";
import CustomContainer from "../components/Custom/CustomContainer";
import { scrollBarStyle } from "../util/ScrollBarStyle";
import CheckoutSlider from "../components/Checkout/CheckoutSlider";

const MainContainer = ({ children, ...props }: ContainerProps) => (
  <CustomContainer
    borderRadius="lg"
    minHeight="83vh"
    maxWidth="75%"
    bg="white"
    position="absolute"
    top="15vh"
    left="12%"
    transition="all ease-in-out 0.5s"
    sx={scrollBarStyle()}
    {...props}
  >
    {children}
  </CustomContainer>
);

const Checkout: NextPage = () => {
  const [stageNo, setStageNo] = useState<number>(0);

  return (
    <Box width="100%" height="100vh" position="relative" textAlign="center">
      <Head key={0}>
        <title>Checkout</title>
      </Head>
      <Box
        w="100%"
        h="40vh"
        bgColor="primary.800"
        display="flex"
        borderRadius="0 0 3rem 3rem"
      >
        <CheckoutSlider
          getSelectedIndx={(selectedIndx) => {
            setStageNo(selectedIndx);
          }}
        />
      </Box>

      <MainContainer>
        {(() => {
          switch (stageNo) {
            case 0:
              return (
                <Fade in={true}>
                  <Cart proceed={() => setStageNo(2)} />
                </Fade>
              );
            case 1:
              return (
                <Fade in={true}>
                  <Shipping />
                </Fade>
              );
          }
        })()}
      </MainContainer>
    </Box>
  );
};

export default WithAuth(Checkout);
