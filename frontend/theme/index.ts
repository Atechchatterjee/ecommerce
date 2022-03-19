import { extendTheme } from "@chakra-ui/react";
import ButtonStyles from "./ButtonStyles";
import ColorPalatte from "./ColorPalatte";
import InputStyles from "./InputStyles";
import CheckBoxStyles from "./CheckBoxStyles";

export default extendTheme({
  colors: ColorPalatte,
  components: {
    Button: ButtonStyles,
    Input: InputStyles,
    Checkbox: CheckBoxStyles,
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
