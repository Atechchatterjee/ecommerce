import { Box, Fade, SliderMark, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Cart from "../components/Checkout/Cart";
import CustomSlider from "../components/Custom/CustomSlider";
import WithAuth from "../util/WithAuth";
import { useState } from "react";
import Shipping from "../components/Checkout/Shipping";
import Head from "next/head";
import CustomContainer from "../components/Custom/CustomContainer";
import { scrollBarStyle } from "../util/ScrollBarStyle";

const Checkout: NextPage = () => {
  const [stageNo, setStageNo] = useState<number>(1);
  const [stageNames, setStageNames] = useState<string[]>([
    "Cart",
    "Shipping",
    "Payment",
  ]);
  const [hover, setHover] = useState<boolean>(false);

  const Slider = () => (
    <CustomSlider
      max={4}
      value={stageNo}
      width="70%"
      marginTop="1.5%"
      onChange={(value) => (value < stageNo ? setStageNo(value) : null)}
    >
      {stageNames.map((stageName, indx) => (
        <SliderMark
          value={indx + 1}
          key={indx + 1}
          mt="5"
          ml={`-${stageName.length}`}
          color={indx + 1 === stageNo ? "white" : "gray.300"}
          fontSize="md"
          textAlign="center"
        >
          {stageName}
        </SliderMark>
      ))}
    </CustomSlider>
  );

  return (
    <Box
      bgImage="/checkout-screen-background-2.png"
      width="100%"
      height="100vh"
      position="relative"
      textAlign="center"
    >
      <Head key={0}>
        <title>Checkout</title>
      </Head>
      <Slider />

      <CustomContainer
        borderRadius="lg"
        width="100%"
        maxWidth="75%"
        bgColor="white"
        height="83%"
        minHeight="50%"
        marginTop="4em"
        sx={scrollBarStyle()}
        position="relative"
        backgroundColor={`rgba(255,255,255, 0.85)`}
        backdropFilter={hover ? "blur(8px)" : "blur(14px)"}
        transition={`all 0.2s ease-in-out`}
        interactive
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {(() => {
          switch (stageNo) {
            case 1:
              return (
                <Fade in={true}>
                  <Cart proceed={() => setStageNo(2)} />
                </Fade>
              );
            case 2:
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
