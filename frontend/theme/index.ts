import { extendTheme } from "@chakra-ui/react";
import ButtonStyles from "./ButtonStyles";
import ColorPalatte from "./ColorPalatte";

export default extendTheme({
  colors: ColorPalatte,
  components: {
    Button: ButtonStyles
  },
});
