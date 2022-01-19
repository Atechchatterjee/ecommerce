import {
  Box,
  Container,
  Grid,
  Heading,
  Link,
  VStack,
  Text,
  Avatar,
  Stack,
  HStack,
} from "@chakra-ui/react";
import React from "react";

const Footer: React.FC = () => {
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
        {/* <Box w="100%" h="10" bg="blue.500" /> */}
        <Container w="100%">
          <VStack spacing={10}>
            <div>
              <Heading
                as="h1"
                size="md"
                isTruncated
                style={{ textAlign: "left" }}
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
                // style={{ marginTop: "2rem" }}
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
        <Container>
          <VStack style={{ textAlign: "left" }}>
            <div>
              <Heading as="h1" size="md" isTruncated>
                Company
              </Heading>
              <div style={{ height: "1em" }}></div>
              <Link size="sm" color="gray.500">
                About Us
              </Link>
              <div style={{ height: "0.4em" }}></div>
              <Link size="sm" color="gray.500">
                Team Member
              </Link>
              <div style={{ height: "0.4em" }}></div>
              <Link size="sm" color="gray.500">
                Career
              </Link>
              <div style={{ height: "0.4em" }}></div>
              <Link size="sm" color="gray.500">
                Contact Us
              </Link>
              <div style={{ height: "0.4em" }}></div>
              <Link size="sm" color="gray.500">
                Affiliate
              </Link>
              <div style={{ height: "0.4em" }}></div>
              <Link size="sm" color="gray.500">
                Order History
              </Link>
            </div>
          </VStack>
        </Container>
        <Container>
          <VStack style={{ textAlign: "left" }}>
            <div>
              <Heading as="h1" size="md" isTruncated>
                My Account
              </Heading>
              <div style={{ height: "1em" }}></div>
              <Link size="sm" color="gray.500">
                Track My Order
              </Link>
              <div style={{ height: "0.4em" }}></div>
              <Link size="sm" color="gray.500">
                View Cart
              </Link>
              <div style={{ height: "0.4em" }}></div>
              <Link size="sm" color="gray.500">
                Sign In
              </Link>
              <div style={{ height: "0.4em" }}></div>
              <Link size="sm" color="gray.500">
                Help
              </Link>
              <div style={{ height: "0.4em" }}></div>
              <Link size="sm" color="gray.500">
                My Wishlist
              </Link>
              <div style={{ height: "0.4em" }}></div>
              <Link size="sm" color="gray.500">
                Privacy Policy
              </Link>
            </div>
          </VStack>
        </Container>
        <Container>
          <VStack style={{ textAlign: "left" }}>
            <div>
              <Heading as="h1" size="md" isTruncated>
                Customer Service
              </Heading>
              <div style={{ height: "1em" }}></div>
              <Link size="sm" color="gray.500">
                Payment Methods
              </Link>
              <div style={{ height: "0.4em" }}></div>
              <Link size="sm" color="gray.500">
                Money-back gaurentee!
              </Link>
              <div style={{ height: "0.4em" }}></div>
              <Link size="sm" color="gray.500">
                Product Returns
              </Link>
              <div style={{ height: "0.4em" }}></div>
              <Link size="sm" color="gray.500">
                Support Center
              </Link>
              <div style={{ height: "0.4em" }}></div>
              <Link size="sm" color="gray.500">
                Shipping
              </Link>
              <div style={{ height: "0.4em" }}></div>
              <Link size="sm" color="gray.500">
                Term and Conditions
              </Link>
            </div>
          </VStack>
        </Container>
      </Grid>
    </footer>
  );
};

export default Footer;
