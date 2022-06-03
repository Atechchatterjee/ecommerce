import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Box,
  Fade,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import SignUp from "../components/Auth/SignUp";
import SignIn from "../components/Auth/SignIn";
import Header from "../components/Layout/Header";
import CustomContainer from "../components/Custom/CustomContainer";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

const Login: NextPage = () => {
  const [width] = useWindowDimensions();

  return (
    <Box position="relative" h="100vh" w="100%">
      <Header excludeCategoryBar />
      <CustomContainer
        height="35em"
        borderRadius="xl"
        marginBottom="7%"
        width={width < 1200 ? "60vh" : "40vw"}
        position="absolute"
        display="flex"
        alignContent="center"
        top="20%"
        left={width < 1200 ? "28%" : "31%"}
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
                <Heading
                  as="h2"
                  size="md"
                  isTruncated
                  fontFamily="Sora"
                  fontSize={{ base: "15px", md: "17px", lg: "19px" }}
                >
                  Sign Up
                </Heading>
              </Tab>
              <Tab
                _focus={{
                  outline: "none",
                }}
                _selected={{ color: "primary.500" }}
              >
                <Heading
                  as="h2"
                  size="md"
                  isTruncated
                  fontFamily="Sora"
                  fontSize={{ base: "15px", md: "17px", lg: "19px" }}
                >
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
