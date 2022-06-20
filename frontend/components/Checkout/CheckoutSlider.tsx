import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { SiRazorpay } from "react-icons/si";
import HorizontalSlider from "../Widgets/HorizontalSlider";

interface CheckoutSliderProps {
  getSelectedIndx?: (selectedIndx: number) => void;
}

const CheckoutSlider = ({ getSelectedIndx }: CheckoutSliderProps) => {
  return (
    <Box ml="20.5%" mt="2%">
      <HorizontalSlider
        labels={[
          { icon: FaShoppingCart, text: "Cart Items" },
          { icon: MdLocationOn, text: "Shipping Details" },
          { icon: SiRazorpay, text: "Payment Options" },
        ]}
        getSelectedIndx={getSelectedIndx}
      />
    </Box>
  );
};

export default CheckoutSlider;
