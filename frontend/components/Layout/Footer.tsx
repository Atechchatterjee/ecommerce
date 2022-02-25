import {
  Container,
  Grid,
  Heading,
  Link,
  VStack,
  Text,
  Avatar,
  HStack,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Footer: React.FC = () => {
  const [col1, _] = useState<string[]>([
    "About Us",
    "Team Member",
    "Career",
    "Contact Us",
    "Affiliate",
    "Order History",
  ]);
  const [col2, __] = useState<string[]>([
    "Track My Order",
    "View Cart",
    "Sign In",
    "Help",
    "My Wishlist",
    "Privacy Policy",
  ]);
  const [col3, ___] = useState<string[]>([
    "Payment Methods",
    "Money-back gaurentee!",
    "Product Returns",
    "Support Center",
    "Shipping",
    "Term and Conditions",
  ]);

  return (
    <footer
      style={{
        backgroundColor: "#F8F8F8",
        height: "464px",
        marginTop: "3em",
      }}
    >
      <Grid
        h="20em"
        templateColumns="repeat(4, 1fr)"
        gap={4}
        padding="6em 15em"
      >
        <Container w="100%" key="1">
          <VStack spacing={10}>
            <div>
              <Heading
                as="h1"
                size="md"
                isTruncated
                style={{ textAlign: "left" }}
                fontFamily="Sora"
                fontWeight="bold"
              >
                Ecommerce Design
              </Heading>
              <div style={{ height: "2em" }}></div>
              <Text>Got Question? Call us 24/7</Text>
              <div style={{ height: "0.5em" }}></div>
              <Link
                href="tel:18005707777"
                fontWeight={700}
                fontSize="1.2em"
                textUnderlineOffset="0.1em"
              >
                1-800-570-7777
              </Link>
              <div style={{ height: "0.5em" }}></div>
              <Text color="gray.600">
                Register now to get updates on pronot get up icons &amp; coupons
                ster now toon.
              </Text>
              <div style={{ height: "2em" }}></div>
              <HStack>
                <Avatar
                  src="facebook_circle.svg"
                  size="sm"
                  backgroundColor="white"
                  style={{ cursor: "pointer" }}
                />
                <Avatar
                  src="twitter_circle.svg"
                  size="sm"
                  backgroundColor="white"
                  style={{ cursor: "pointer" }}
                />
                <Avatar
                  src="instagram_circle.svg"
                  size="sm"
                  backgroundColor="white"
                  style={{ cursor: "pointer" }}
                />
                <Avatar
                  src="youtube_circle.svg"
                  size="sm"
                  backgroundColor="white"
                  style={{ cursor: "pointer" }}
                />
                <Avatar
                  src="pinterest_circle.svg"
                  size="sm"
                  backgroundColor="white"
                  style={{ cursor: "pointer" }}
                />
              </HStack>
            </div>
          </VStack>
        </Container>
        <Container key="2">
          <VStack style={{ textAlign: "left" }}>
            <div>
              <Heading
                as="h1"
                size="md"
                isTruncated
                fontFamily="Sora"
                fontWeight="bold"
              >
                Company
              </Heading>
              <Container marginTop="0.5em" padding="0">
                {col1.map((val) => (
                  <>
                    <div style={{ height: "0.7em" }}></div>
                    <Link
                      size="sm"
                      color="gray.500"
                      textUnderlineOffset="0.1em"
                    >
                      {val}
                    </Link>
                  </>
                ))}
              </Container>
            </div>
          </VStack>
        </Container>
        <Container key="3">
          <VStack style={{ textAlign: "left" }}>
            <div>
              <Heading
                as="h1"
                size="md"
                isTruncated
                fontFamily="Sora"
                fontWeight="bold"
              >
                My Account
              </Heading>
              <Container marginTop="0.5em" padding="0">
                {col2.map((val, indx) => (
                  <Box key={indx}>
                    <div style={{ height: "0.7em" }}></div>
                    <Link
                      size="sm"
                      color="gray.500"
                      textUnderlineOffset="0.1em"
                    >
                      {val}
                    </Link>
                  </Box>
                ))}
              </Container>
            </div>
          </VStack>
        </Container>
        <Container key="4">
          <VStack style={{ textAlign: "left" }}>
            <div>
              <Heading
                as="h1"
                size="md"
                isTruncated
                fontFamily="Sora"
                fontWeight="bold"
              >
                Customer Service
              </Heading>
              <Container marginTop="0.5em" padding="0">
                {col3.map((val, indx) => (
                  <Box key={indx}>
                    <div style={{ height: "0.7em" }}></div>
                    <Link
                      size="sm"
                      color="gray.500"
                      textUnderlineOffset="0.1em"
                    >
                      {val}
                    </Link>
                  </Box>
                ))}
              </Container>
            </div>
          </VStack>
        </Container>
      </Grid>
    </footer>
  );
};

export default Footer;
