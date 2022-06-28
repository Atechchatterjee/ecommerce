import { NextPage } from "next";
import { useState } from "react";
import { scrollBarStyle } from "../util/ScrollBarStyle";
import { Box, Fade, ContainerProps } from "@chakra-ui/react";
import Cart from "../components/Checkout/Cart";
import WithAuth from "../util/WithAuth";
import Shipping from "../components/Checkout/Shipping";
import Head from "next/head";
import CustomContainer from "../components/Custom/CustomContainer";
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
    <Box w="100%" h="100vh" position="relative" textAlign="center">
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
        <CheckoutSlider indx={[stageNo, setStageNo]} />
      </Box>

      <MainContainer>
        {(() => {
          switch (stageNo) {
            case 0:
              return (
                <Fade in>
                  <Cart proceed={() => setStageNo(1)} />
                </Fade>
              );
            case 1:
              return (
                <Fade in>
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
