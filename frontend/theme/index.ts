import { extendTheme } from "@chakra-ui/react";
import ButtonStyles from "./ButtonStyles";
import ColorPalatte from "./ColorPalatte";
import InputStyles from "./InputStyles";

export default extendTheme({
  colors: ColorPalatte,
  components: {
    Button: ButtonStyles,
    Input: InputStyles
  },
  styles: {
    global: {
      Input: {
        backgroundColor: "red",
        focusBorderColor: "red"
      },
    }
  }
});
