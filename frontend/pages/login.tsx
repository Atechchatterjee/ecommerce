import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Center,
  Stack,
  Heading,
  Container,
  Box,
  Fade,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import SignUp from "../components/Auth/SignUp";
import SignIn from "../components/Auth/SignIn";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import CustomContainer from "../components/Custom/CustomContainer";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

const Login: NextPage = () => {
  const [width] = useWindowDimensions();

  return (
    <Box position="relative" h="100vh" w="100%">
      <Header />
      <CustomContainer
        height="35em"
        borderRadius="xl"
        marginBottom="7%"
        width="100%"
        position="absolute"
        display="flex"
        alignContent="center"
        top="12%"
        left="31%"
      >
        <Box
          padding={width >= 500 ? "0 10% 0% 10%" : "0"}
          marginTop="3em"
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Tabs
            align="center"
            isFitted={false}
            variant="line"
            isLazy
            position="relative"
            defaultIndex={1}
          >
            <TabList>
              <Tab
                _focus={{
                  outline: "none",
                }}
                _selected={{ color: "primary.500" }}
              >
                <Heading as="h2" size="md" isTruncated fontFamily="Sora">
                  Sign Up
                </Heading>
              </Tab>
              <Tab
                _focus={{
                  outline: "none",
                }}
                _selected={{ color: "primary.500" }}
              >
                <Heading as="h2" size="md" isTruncated fontFamily="Sora">
                  Sign In
                </Heading>
              </Tab>
            </TabList>
            <TabPanels position="relative">
              <TabPanel>
                <Fade in={true}>
                  <SignUp />
                </Fade>
              </TabPanel>
              <TabPanel>
                <Fade in={true}>
                  <SignIn />
                </Fade>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </CustomContainer>
    </Box>
  );
};

export default Login;
