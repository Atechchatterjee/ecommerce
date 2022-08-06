import React, { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import "react-slideshow-image/dist/styles.css";
import {
  Box,
  BoxProps,
  Button,
  Flex,
  Heading,
  HeadingProps,
  Image,
  Text,
} from "@chakra-ui/react";
import Navigation from "../components/Layout/Navigation";
import { RUPEE_SYMBOL } from "../util/Symbols";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { LazyMotion, AnimatePresence, m, domAnimation } from "framer-motion";

const LeftBar = () => (
  <Box
    w="6.25rem"
    h="110vh"
    position="absolute"
    left="0"
    top="0"
    bg="#EAECF3"
    zIndex="-1"
  />
);

const MainHeading = ({ children, ...props }: HeadingProps) => (
  <Heading
    bgGradient="linear(to-r, #283F89, #4565C9, #4B74ED)"
    bgClip="text"
    fontFamily="Sora"
    fontSize="7xl"
    {...props}
  >
    {children}
  </Heading>
);

interface FeatureCardProps extends BoxProps {
  header: string;
  headerIcon?: any;
  text: string;
}

const FeatureCard = ({
  header,
  headerIcon: HeaderIcon,
  text,
  ...props
}: FeatureCardProps) => {
  const [coords, setCoords] = useState({ x: -100, y: -100 });

  const boxRef = useRef<any>(null);

  const handleMouseMove = (event: any) => {
    const res = boxRef.current.getBoundingClientRect();

    setCoords({
      x: event.clientX - res.left,
      y: event.clientY - res.top,
    });
  };

  const BG = `radial-gradient(
          circle at ${coords.x}px ${coords.y}px, #6A8EFC 0%, #6A8EFC0F calc(0% + 190px))
          no-repeat border-box border-box rgba(69, 101, 201, 0.8)`;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gridGap="2rem"
      borderRadius="xl"
      padding="3rem 4rem"
      backdropFilter="blur(20px)"
      ref={boxRef}
      bg={BG}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCoords({ x: -100, y: -100 })}
      {...props}
    >
      <Flex flexDirection="row" gridGap="2rem">
        <HeaderIcon />
        <Heading fontFamily="Sora" color="white" fontSize="2xl">
          {header}
        </Heading>
      </Flex>
      <Text color="gray.200" justifySelf="center" fontSize="1.1rem">
        {text}
      </Text>
    </Box>
  );
};

const featureCardAnimation = (y: number = 100) => ({
  hidden: {
    opacity: 0,
    y: y,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      delay: 0.5,
    },
  },
});

const useScroll = (): { scrollTop: number } => {
  const [scrollTop, setScrollTop] = useState<number>(0);

  useEffect(() => {
    if (document) {
      const root = document.getElementById("window-root");
      const onScroll = (e: any) => {
        setScrollTop(e.target?.scrollTop);
      };
      if (root) root.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [scrollTop]);

  return { scrollTop };
};

const QualityProductImg: React.FC = () => (
  <Image src="quality-icon.svg" w="30px" h="30px" />
);
const LatestPriceImg: React.FC = () => (
  <Image src="latest-prices-icon.svg" w="30px" h="30px" />
);

const HastleFreeShoppingImg: React.FC = () => (
  <Image src="hastle-free-shopping-icon.svg" w="30px" h="30px" />
);

const Home: NextPage = () => {
  const { scrollTop } = useScroll();

  return (
    <LazyMotion features={domAnimation}>
      <Box overflow="clip">
        <LeftBar />
        <Box ml="12rem">
          <Flex flexDirection="row" w="100%">
            <Image src="CND_logo.jpg" w="6rem" h="3rem" mt="0.7rem" />
            <Box display="flex" justifyContent="right" w="100%">
              <Navigation colorMode="normal" w="30rem" h="4rem" active={1} />
            </Box>
          </Flex>
          <Flex flexDirection="row" opacity={1 / ((scrollTop + 1) * 0.005)}>
            <AnimatePresence exitBeforeEnter>
              <m.div
                animate={{ opacity: 1, x: 0 }}
                initial={{ x: -100, opacity: 0 }}
                transition={{ type: "spring", delay: 0.2, stiffness: 50 }}
                style={{ flex: 1 }}
              >
                <Flex flexDirection="column" w="100%" mt="9rem">
                  <Flex flexDirection="column" gridGap="1rem">
                    <MainHeading>Want to get high</MainHeading>
                    <MainHeading>Quality Steel ?</MainHeading>
                  </Flex>
                  <Text
                    fontSize="xl"
                    color="primary.500"
                    fontWeight="semibold"
                    mt="3rem"
                  >
                    We got you covered. Get the best quality steel at up to{" "}
                    <br /> date market rates.
                  </Text>
                  <Flex flexDirection="row" mt="4rem" gridGap="2rem" w="30rem">
                    <Button
                      variant="primarySolid"
                      padding="1.7rem 1rem"
                      flex="1"
                    >
                      <Flex flexDirection="row" gridGap="1rem">
                        <Text>{RUPEE_SYMBOL}</Text>
                        <Text>Latest Price</Text>
                      </Flex>
                    </Button>
                    <Button
                      variant="primaryOutline"
                      padding="1.7rem 1rem"
                      borderRadius="md"
                      flex="1"
                    >
                      <Flex flexDirection="row" gridGap="2rem">
                        <Text fontSize="0.9rem" fontWeight="semibold">
                          OUR PRODUCTS
                        </Text>
                        <TriangleDownIcon fontSize="xs" mt="0.1rem" />
                      </Flex>
                    </Button>
                  </Flex>
                </Flex>
              </m.div>
            </AnimatePresence>

            <AnimatePresence>
              <m.div
                animate={{ opacity: 1, x: 0 }}
                initial={{ x: 100, opacity: 0 }}
                transition={{ type: "spring", delay: 0.2, stiffness: 50 }}
                style={{ flex: 1, zIndex: -1 }}
              >
                <Image
                  src="illustration-hero-section.svg"
                  mt="5rem"
                  mr="3rem"
                  w="848px"
                  h="565px"
                  zIndex="-1"
                  position="relative"
                />
              </m.div>
            </AnimatePresence>
          </Flex>
          <Box zIndex="20" position="absolute" opacity="1">
            <Flex
              flexDirection="row"
              gridGap="5rem"
              w="95%"
              padding="5rem 5rem 2rem 0"
              mt={`-${scrollTop * 0.015}%`}
            >
              <AnimatePresence>
                <m.div
                  variants={featureCardAnimation(40)}
                  initial="hidden"
                  animate="show"
                  style={{
                    flex: 1,
                  }}
                >
                  <FeatureCard
                    header="Quality Products"
                    headerIcon={QualityProductImg}
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate ligula nec orci volutpat tristique. Integer massa mauris, iaculis id accumsan et, efficitur sed ipsum. Vivamus ligula nunc, imperdiet eu nibh eu, fermentum malesuada nulla."
                  />
                </m.div>
              </AnimatePresence>

              <AnimatePresence>
                <m.div
                  variants={featureCardAnimation(100)}
                  initial="hidden"
                  animate="show"
                  style={{
                    flex: 1,
                  }}
                >
                  <FeatureCard
                    header="Latest Prices"
                    headerIcon={LatestPriceImg}
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate ligula nec orci volutpat tristique. Integer massa mauris, iaculis id accumsan et, efficitur sed ipsum. Vivamus ligula nunc, imperdiet eu nibh eu, fermentum malesuada nulla."
                    flex="1"
                  />
                </m.div>
              </AnimatePresence>

              <AnimatePresence>
                <m.div
                  variants={featureCardAnimation(160)}
                  initial="hidden"
                  animate="show"
                  style={{
                    flex: 1,
                  }}
                >
                  <FeatureCard
                    header="Hastle Free Shopping"
                    headerIcon={HastleFreeShoppingImg}
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate ligula nec orci volutpat tristique. Integer massa mauris, iaculis id accumsan et, efficitur sed ipsum. Vivamus ligula nunc, imperdiet eu nibh eu, fermentum malesuada nulla."
                    flex="1"
                  />
                </m.div>
              </AnimatePresence>
            </Flex>
          </Box>
        </Box>

        <Image
          src="Wave.svg"
          zIndex="-1"
          top="77%"
          left="12rem"
          position="absolute"
        />
        <Flex
          flexDirection="column"
          gridGap="4rem"
          bgImage="bg-home-1.svg"
          position="relative"
          opacity="1"
          w="100%"
          h="100vh"
          mt={`${130 - scrollTop * 0.1}px`}
          display="flex"
          justifyContent="center"
          bgRepeat="no-repeat"
        >
          <AnimatePresence>
            <m.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Heading
                color="white"
                fontFamily="Sora"
                fontSize="4xl"
                textAlign="center"
              >
                Our Products
              </Heading>
            </m.div>
          </AnimatePresence>
          <Box display="flex" justifyContent="center">
            <Image src="our-product-line.svg" w="70%" />
          </Box>
        </Flex>
      </Box>
    </LazyMotion>
  );
};

export default Home;
