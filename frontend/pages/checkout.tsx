import { Box, Fade, SliderMark, ContainerProps } from "@chakra-ui/react";
import { NextPage } from "next";
import Cart from "../components/Checkout/Cart";
import CustomSlider from "../components/Custom/CustomSlider";
import WithAuth from "../util/WithAuth";
import { useState } from "react";
import Shipping from "../components/Checkout/Shipping";
import Head from "next/head";
import CustomContainer from "../components/Custom/CustomContainer";
import { scrollBarStyle } from "../util/ScrollBarStyle";
import CheckoutSlider from "../components/Checkout/CheckoutSlider";

const Checkout: NextPage = () => {
  const [stageNo, setStageNo] = useState<number>(0);
  const [stageNames, setStageNames] = useState<string[]>([
    "Cart",
    "Shipping",
    "Payment",
  ]);

  const ContainerStyles: ContainerProps = {
    borderRadius: "lg",
    width: "100%",
    maxWidth: "75%",
    bgColor: "white",
    position: "absolute",
    height: "83%",
    minHeight: "50%",
    top: "15vh",
    left: "12%",
    overflow: "auto",
    backdropFilter: "blur(4px)",
    sx: scrollBarStyle(),
  };

  return (
    <Box width="100%" height="100vh" position="relative" textAlign="center">
      <Head key={0}>
        <title>Checkout</title>
      </Head>
      <Box w="100%" h="40vh" bgColor="primary.500" display="flex">
        <CheckoutSlider
          getSelectedIndx={(selectedIndx) => {
            setStageNo(selectedIndx);
          }}
        />
      </Box>

      <CustomContainer transition="all ease-in-out 0.5s" {...ContainerStyles}>
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
      </CustomContainer>
    </Box>
  );
};

export default WithAuth(Checkout);
