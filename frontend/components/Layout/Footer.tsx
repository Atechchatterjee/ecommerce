import {
  Container,
  Heading,
  Link,
  Text,
  Avatar,
  HStack,
  Box,
  Flex,
  FlexProps,
  Grid,
} from "@chakra-ui/react";
import React from "react";
import { useDynamicColumns } from "../../hooks/useDynamicColumns";

const col2 = [
  "About Us",
  "Team Member",
  "Career",
  "Contact Us",
  "Affiliate",
  "Order History",
];
const col3 = [
  "Track My Order",
  "View Cart",
  "Sign In",
  "Help",
  "My Wishlist",
  "Privacy Policy",
];
const col4 = [
  "Payment Methods",
  "Money-back gaurentee!",
  "Product Returns",
  "Support Center",
  "Shipping",
  "Term and Conditions",
];

const Col1 = ({ ...props }: FlexProps) => (
  <Flex width="50%" gridGap={5} flex="1" flexDirection="column" {...props}>
    <Heading
      as="h1"
      size="md"
      isTruncated
      style={{ textAlign: "left" }}
      fontFamily="Sora"
      fontWeight="bold"
    >
      CND E-Kart
    </Heading>
    <Text>Got Question? Call us 24/7</Text>
    <Link
      href="tel:18005707777"
      fontWeight={700}
      fontSize="1.2em"
      textUnderlineOffset="0.1em"
    >
      1-800-570-7777
    </Link>
    <Text color="gray.600">
      Register now to get updates on pronot
      <br /> get up icons &amp; coupons ster now toon.
    </Text>
    <HStack>
      <Avatar
        src="/facebook_circle.svg"
        size="sm"
        backgroundColor="white"
        style={{ cursor: "pointer" }}
      />
      <Avatar
        src="/twitter_circle.svg"
        size="sm"
        backgroundColor="white"
        style={{ cursor: "pointer" }}
      />
      <Avatar
        src="/instagram_circle.svg"
        size="sm"
        backgroundColor="white"
        style={{ cursor: "pointer" }}
      />
      <Avatar
        src="/youtube_circle.svg"
        size="sm"
        backgroundColor="white"
        style={{ cursor: "pointer" }}
      />
      <Avatar
        src="/pinterest_circle.svg"
        size="sm"
        backgroundColor="white"
        style={{ cursor: "pointer" }}
      />
    </HStack>
  </Flex>
);

const Col2 = ({ ...props }: FlexProps) => (
  <Flex
    gridGap={1}
    style={{ textAlign: "left" }}
    flex="1"
    flexDirection="column"
    width="30%"
    {...props}
  >
    <Heading as="h1" size="md" isTruncated fontFamily="Sora" fontWeight="bold">
      Company
    </Heading>
    <Container marginTop="0.5em" padding="0">
      {col2.map((val) => (
        <>
          <div style={{ height: "0.7em" }}></div>
          <Link size="sm" color="gray.500" textUnderlineOffset="0.1em">
            {val}
          </Link>
        </>
      ))}
    </Container>
  </Flex>
);

const Col3 = ({ ...props }: FlexProps) => (
  <Flex
    style={{ textAlign: "left" }}
    flex="1"
    flexDirection="column"
    gridGap={5}
    width="40%"
    {...props}
  >
    <Heading as="h1" size="md" isTruncated fontFamily="Sora" fontWeight="bold">
      My Account
    </Heading>
    <Container padding="0">
      {col3.map((val, indx) => (
        <Box key={indx}>
          <div style={{ height: "0.7em" }}></div>
          <Link size="sm" color="gray.500" textUnderlineOffset="0.1em">
            {val}
          </Link>
        </Box>
      ))}
    </Container>
  </Flex>
);

const Col4 = ({ ...props }: FlexProps) => (
  <Flex
    style={{ textAlign: "left" }}
    flex="1"
    flexDirection="column"
    gridGap={5}
    width="50%"
    {...props}
  >
    <Heading as="h1" size="md" isTruncated fontFamily="Sora" fontWeight="bold">
      Customer Service
    </Heading>

    <Container padding="0">
      {col4.map((val, indx) => (
        <Box key={indx}>
          <div style={{ height: "0.7em" }}></div>
          <Link size="sm" color="gray.500" textUnderlineOffset="0.1em">
            {val}
          </Link>
        </Box>
      ))}
    </Container>
  </Flex>
);

const Footer: React.FC = () => {
  const [columns] = useDynamicColumns(4, [1700, 1000, 600]);

  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: "#F8F8F8",
        height: "initial",
        marginTop: "3em",
        padding: "1% 5% 5% 8%",
      }}
    >
      <Grid
        h="inherit"
        gridGap={2}
        templateColumns={`repeat(${columns}, 1fr)`}
        templateRows={`repeat(1), 1fr)`}
      >
        <Col1 marginTop="7%" height="inherit" />
        <Col2 marginTop="7%" height="inherit" />
        <Col3 marginTop="7%" height="inherit" />
        <Col4 marginTop="7%" height="inherit" />
      </Grid>
    </footer>
  );
};

export default Footer;
