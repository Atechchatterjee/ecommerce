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

const Login: NextPage = () => {
  return (
    <>
      <Banner text="My Account" />
      <Container
        style={{
          boxShadow: "0.2em 0.2em 0.2em 0.2em #e1e1e1",
          height: "33em",
        }}
      >
        <Center color="gray" style={{ marginTop: "7vh" }}>
          <Stack
            direction={["row", "column"]}
            spacing="35px"
            style={{ width: "25em", marginTop: "3em" }}
          >
            <Tabs align="center" isFitted={false} variant="line">
              <TabList>
                <Tab>
                  <Heading as="h2" size="md" isTruncated>
                    Sign Up
                  </Heading>
                </Tab>
                <Tab>
                  <Heading as="h2" size="md" isTruncated>
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
      </Container>
    </>
  );
};

export default Login;
