import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CookiesProvider } from "react-cookie";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <CookiesProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </CookiesProvider>
    </ChakraProvider>
  );
};

export default MyApp;
