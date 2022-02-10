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
        pinkGradient: (props: any) => ({
          color: "white",
          fontFamily: "Sora",
          fontWeight: "medium",
          bgGradient: "linear(to-b, #9D84B7, #E863B6)",
          _hover: {
            bgGradient: "linear(to-b, #9D84B7, #E863B6)",
          },
        }),
        blueGradient: (props: any) => ({
          color: "white",
          fontFamily: "Sora",
          fontWeight: "medium",
          bgGradient: "linear(to-b, #161F4F, #4E2A81)",
          _hover: {
            bgGradient: "linear(to-b, #222D68, #6C48A5)",
          },
        }),
        redGradient: (props: any) => ({
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
