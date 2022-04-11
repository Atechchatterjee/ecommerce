import {
  Slider,
  SliderProps,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

interface CustomSliderProps extends SliderProps {
  icon?: React.ReactNode;
}

const CustomSlider = ({ icon, children, ...props }: CustomSliderProps) => (
  <Slider defaultValue={60} min={0} max={3} step={1} {...props}>
    {children}
    <SliderTrack bg="gray.300" opacity="0.8" transition="all ease-in-out 0.2s">
      {icon ? icon : <SliderFilledTrack bg="secondary.200" />}
    </SliderTrack>
    <SliderThumb boxSize={8} transition="all ease-in-out 0.2s">
      <Box color="secondary.200" as={FaShoppingCart} size={15} />
    </SliderThumb>
  </Slider>
);

export default CustomSlider;
