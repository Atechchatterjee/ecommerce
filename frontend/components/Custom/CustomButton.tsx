import { extendTheme } from "@chakra-ui/react";

const CustomButtonTheme = extendTheme({
  components: {
    Button: {
      variants: {
        blueSolid: (props: any) => ({
          bg: "#091353",
          color: "white",
          fontFamily: "Sora",
          fontWeight: "medium",
          _hover: { bg: "#314775" },
        }),
        pinkSolid: (props: any) => ({
          bg: "#9D84B7",
          color: "white",
          fontFamily: "Sora",
          fontWeight: "medium",
          _hover: { bg: "#B199CC" },
        }),
      },
    },
  },
});

export default CustomButtonTheme;
