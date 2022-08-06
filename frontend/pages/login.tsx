import { Box, Flex, Text, Heading, Image } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import Navigation from "../components/Layout/Navigation";

const NewLogin: NextPage = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(true);

  return (
    <Flex flexDirection="row" w="100%">
      <Box flex="1">
        <Image src="CND_logo.jpg" w="6rem" h="3rem" mt="1%" ml="2%" />
        <Box padding="10% 20%">
          <Flex flexDirection="column" gridGap="1em">
            <Heading fontFamily="Sora" textAlign="center" color="primary.500">
              {showSignIn ? "Sign In" : "Sign Up"}
            </Heading>
            <Flex
              flexDirection="row"
              gridGap="0.5em"
              justifyContent="center"
              mb="2em"
            >
              <Text textAlign="center">or</Text>
              <Text
                textAlign="center"
                color="primary.100"
                cursor="pointer"
                fontWeight="bold"
                onClick={() => setShowSignIn(!showSignIn)}
              >
                {showSignIn ? "SignUp" : "SignIn"}
              </Text>
            </Flex>
          </Flex>
          {showSignIn ? <SignIn /> : <SignUp />}
        </Box>
      </Box>
      <Flex bg="primary.500" flex="1" height="100vh" flexDirection="column">
        <Box w="100%" display="flex" justifyContent="right">
          <Navigation colorMode="blue" height="3.6rem" w="30em" active={5} />
        </Box>
        <Image src="login_illustration.svg" mt="18%" />
      </Flex>
    </Flex>
  );
};

export default NewLogin;
