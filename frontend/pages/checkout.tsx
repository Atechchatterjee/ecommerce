import { Box, Fade, SliderMark, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Cart from "../components/Checkout/Cart";
import CustomSlider from "../components/Custom/CustomSlider";
import WithAuth from "../util/WithAuth";
import { useState } from "react";
import Shipping from "../components/Checkout/Shipping";

const Checkout: NextPage = () => {
  const [stageNo, setStageNo] = useState<number>(1);
  const [stageNames, setStageNames] = useState<string[]>([
    "Cart",
    "Shipping",
    "Payment",
  ]);

  const Slider = () => (
    <CustomSlider
      max={4}
      value={stageNo}
      width="70%"
      isReadOnly
      marginTop="1.5%"
    >
      {stageNames.map((stageName, indx) => (
        <SliderMark
          value={indx + 1}
          key={indx + 1}
          mt="5"
          ml={`-${stageName.length}`}
          color={indx + 1 === stageNo ? "white" : "gray.500"}
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
      bgGradient="linear(to-b, primary.900, secondary.200)"
      width="100%"
      height="100vh"
      position="relative"
      textAlign="center"
    >
      <Slider />
      {(() => {
        switch (stageNo) {
          case 1:
            return <Cart proceed={() => setStageNo(2)} />;
          case 2:
            return <Shipping />;
        }
      })()}
    </Box>
  );
};

export default WithAuth(Checkout);
