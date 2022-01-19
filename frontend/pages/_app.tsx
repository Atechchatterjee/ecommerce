import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";
import CustomButtonTheme from "../components/Custom/CustomButton";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={CustomButtonTheme}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ChakraProvider>
  );
};

export default MyApp;
