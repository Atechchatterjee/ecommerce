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
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import Banner from "../components/Banner";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const Login: NextPage = () => {
  return (
    <>
      <Header />
      <Banner text="My Account" />
      <Container
        boxShadow="0.2em 0.2em 0.2em 0.2em #e1e1e1"
        height="inherit"
        paddingBottom="4em"
        borderRadius="lg"
      >
        <Center color="gray" style={{ marginTop: "7vh" }}>
          <Stack
            direction={["row", "column"]}
            spacing="35px"
            width="25em"
            marginTop="3em"
          >
            <Tabs align="center" isFitted={false} variant="line" isLazy>
              <TabList>
                <Tab>
                  <Heading as="h2" size="md" isTruncated fontFamily="Sora">
                    Sign Up
                  </Heading>
                </Tab>
                <Tab>
                  <Heading as="h2" size="md" isTruncated fontFamily="Sora">
                    Sign In
                  </Heading>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel on>
                  <SignUp />
                </TabPanel>
                <TabPanel>
                  <SignIn />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Center>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
