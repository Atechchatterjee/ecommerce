import {
  Slider,
  SliderProps,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

interface CustomSliderProps extends SliderProps {
  icon?: React.ReactNode;
}

const CustomSlider = ({ icon, children, ...props }: CustomSliderProps) => {
  const [sliderValue, setSliderValue] = useState<number>(0);

  return (
    <Slider
      defaultValue={60}
      min={0}
      max={3}
      step={1}
      onChange={(value) => {
        setSliderValue(value);
      }}
      {...props}
    >
      {children}
      <SliderTrack bg="primary.200">
        {icon ? icon : <SliderFilledTrack bg="secondary.200" />}
      </SliderTrack>
      <SliderThumb boxSize={8}>
        <Box color="secondary.200" as={FaShoppingCart} size={15} />
      </SliderThumb>
    </Slider>
  );
};

export default CustomSlider;
