import { Box } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { SiRazorpay } from "react-icons/si";
import HorizontalSlider from "../Widgets/HorizontalSlider";

interface CheckoutSliderProps {
  indx: [selectedIndx: number, setSelectedIndx: (_: number) => void];
  disableIndx?: number;
}

const CheckoutSlider = ({ disableIndx, indx }: CheckoutSliderProps) => (
  <Box ml="20.5%" mt="2%">
    <HorizontalSlider
      indx={indx}
      labels={[
        { icon: FaShoppingCart, text: "Cart Items" },
        { icon: MdLocationOn, text: "Shipping Details" },
        { icon: SiRazorpay, text: "Payment Options" },
      ]}
      disableIndx={disableIndx}
    />
  </Box>
);

export default CheckoutSlider;
