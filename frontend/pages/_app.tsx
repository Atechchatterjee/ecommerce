import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "../theme";
import { useEffect, useState } from "react";
import { checkWhichUser } from "../util/Authenticated";
import { UserContext } from "../context/UserContext";
import Head from "next/head";
import ScrollBarWrapper from "../components/Custom/ScrollBarWrapper";
import { QueryClient, QueryClientProvider } from "react-query";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [admin, setAdmin] = useState<boolean | null>(null);

  const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ admin, setAdmin }}>
          <Head>
            <title>Ecommerce Design</title>
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1"
            />
          </Head>
          <ScrollBarWrapper color="secondary">
            <Component {...pageProps} />
          </ScrollBarWrapper>
        </UserContext.Provider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default MyApp;
