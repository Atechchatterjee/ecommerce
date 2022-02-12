import { extendTheme } from "@chakra-ui/react";

const CustomButtonTheme = extendTheme({
  colors: {
    secondaryBlue: {
      200: "#091353",
    },
  },
  components: {
    Button: {
      variants: {
        blueSolid: () => ({
          bg: "#091353",
          color: "white",
          fontFamily: "Sora",
          fontWeight: "medium",
          _hover: { bg: "#314775" },
        }),
        blueOutline: () => ({
          bg: "white",
          color: "#091353",
          outlineColor: "#091354",
          outlineOffset: "none",
          borderRadius: "sm",
          fontFamily: "Sora",
          fontWeight: "medium",
          _hover: { bg: "#091353", color: "#ffffff" },
        }),
        pinkSolid: () => ({
          bg: "#9D84B7",
          color: "white",
          fontFamily: "Sora",
          fontWeight: "medium",
          _hover: { bg: "#B199CC" },
        }),
        pinkGradient: () => ({
          color: "white",
          fontFamily: "Sora",
          fontWeight: "medium",
          bgGradient: "linear(to-b, #9D84B7, #E863B6)",
          _hover: {
            bgGradient: "linear(to-b, #9D84B7, #E863B6)",
          },
        }),
        blueGradient: () => ({
          color: "white",
          fontFamily: "Sora",
          fontWeight: "medium",
          bgGradient: "linear(to-b, #161F4F, #4E2A81)",
          _hover: {
            bgGradient: "linear(to-b, #222D68, #6C48A5)",
          },
        }),
        redGradient: () => ({
          color: "white",
          fontFamily: "Sora",
          fontWeight: "medium",
          bgGradient: "linear(to-b, #D34E93, #FF491C)",
          _hover: {
            bgGradient: "linear(to-b, #FF7597, #F98970)",
          },
        }),
      },
    },
  },
});

export default CustomButtonTheme;
