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
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import SignUp from "../components/Auth/SignUp";
import SignIn from "../components/Auth/SignIn";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import CustomContainer from "../components/Custom/CustomContainer";

const Login: NextPage = () => {
  return (
    <>
      <Header />
      <CustomContainer
        height="inherit"
        paddingBottom="4em"
        borderRadius="lg"
        width="100%"
      >
        <Center color="gray" marginTop="7vh">
          <Stack
            direction={["row", "column"]}
            spacing="35px"
            marginTop="3em"
            width="75%"
          >
            <Tabs align="center" isFitted={false} variant="line" isLazy>
              <TabList>
                <Tab
                  _focus={{
                    outline: "none",
                  }}
                  _selected={{ color: "secondaryBlue.100" }}
                >
                  <Heading as="h2" size="md" isTruncated fontFamily="Sora">
                    Sign Up
                  </Heading>
                </Tab>
                <Tab
                  _focus={{
                    outline: "none",
                  }}
                  _selected={{ color: "secondaryBlue.100" }}
                >
                  <Heading as="h2" size="md" isTruncated fontFamily="Sora">
                    Sign In
                  </Heading>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <SignUp />
                </TabPanel>
                <TabPanel>
                  <SignIn />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Center>
      </CustomContainer>
      <Footer />
    </>
  );
};

export default Login;
