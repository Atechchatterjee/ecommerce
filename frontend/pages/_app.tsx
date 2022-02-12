import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";
import CustomButtonTheme from "../components/Custom/CustomButton";
import { useEffect, useState } from "react";
import { checkWhichUser } from "../util/Authenticated";
import { UserContext } from "../context/UserContext";

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
    <ChakraProvider theme={CustomButtonTheme}>
      <CookiesProvider>
        <UserContext.Provider value={{ admin, setAdmin }}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </CookiesProvider>
    </ChakraProvider>
  );
};

export default MyApp;
