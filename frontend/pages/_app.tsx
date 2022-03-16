import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";
import theme from "../theme";
import { useEffect, useState } from "react";
import { checkWhichUser } from "../util/Authenticated";
import { UserContext } from "../context/UserContext";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [admin, setAdmin] = useState<boolean | null>(null);
  useEffect(() => {
    checkWhichUser()
      .then(({ admin }) => setAdmin(admin))
      .catch((err) => {
        setAdmin(null);
        console.error(err);
      });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <UserContext.Provider value={{ admin, setAdmin }}>
          <Head>
            <title>Ecommerce Design</title>
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1"
            />
          </Head>
          <Component {...pageProps} />
        </UserContext.Provider>
      </CookiesProvider>
    </ChakraProvider>
  );
};

export default MyApp;
