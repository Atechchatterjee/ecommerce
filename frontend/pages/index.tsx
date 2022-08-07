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
import {
  LazyMotion,
  AnimatePresence,
  m,
  domAnimation,
  useAnimation,
} from "framer-motion";
import { useScroll } from "../hooks/useScroll";

const LeftBar = ({ ...props }: BoxProps) => (
  <Box
    w="6.25rem"
    position="absolute"
    left="0"
    top="0"
    bg="#EAECF3"
    zIndex="-1"
    {...props}
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

const QualityProductImg: React.FC = () => (
  <Image src="quality-icon.svg" w="30px" h="30px" />
);

const LatestPriceImg: React.FC = () => (
  <Image src="latest-prices-icon.svg" w="30px" h="30px" />
);

const HastleFreeShoppingImg: React.FC = () => (
  <Image src="hastle-free-shopping-icon.svg" w="30px" h="30px" />
);

const Section1 = ({ scrollTop }: { scrollTop: number }) => {
  return (
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
                We got you covered. Get the best quality steel at up to <br />{" "}
                date market rates.
              </Text>
              <Flex flexDirection="row" mt="4rem" gridGap="2rem" w="30rem">
                <Button variant="primarySolid" padding="1.7rem 1rem" flex="1">
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
      <Image
        src="Wave.svg"
        zIndex="-1"
        top="46rem"
        left="12rem"
        position="absolute"
      />
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
                text=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                vulputate ligula nec orci volutpat tristique. Integer massa
                mauris, iaculis id accumsan et, efficitur sed ipsum. Vivamus
                ligula nunc, imperdiet eu nibh eu, fermentum malesuada nulla."
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
                text=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                vulputate ligula nec orci volutpat tristique. Integer massa
                mauris, iaculis id accumsan et, efficitur sed ipsum. Vivamus
                ligula nunc, imperdiet eu nibh eu, fermentum malesuada nulla."
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
                text=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                vulputate ligula nec orci volutpat tristique. Integer massa
                mauris, iaculis id accumsan et, efficitur sed ipsum. Vivamus
                ligula nunc, imperdiet eu nibh eu, fermentum malesuada nulla."
                flex="1"
              />
            </m.div>
          </AnimatePresence>
        </Flex>
      </Box>
    </Box>
  );
};

const Section2 = ({ scrollTop }: { scrollTop: number }) => {
  const headingControls = useAnimation();
  const productControls = useAnimation();

  const HeadingAnimation = {
    opacity: 1,
    y: 0,
  };

  const ProductAnimation = {
    opacity: 1,
    x: 0,
    scale: 1,
  };

  useEffect(() => {
    if (scrollTop > 300) headingControls.start(HeadingAnimation);
    if (scrollTop > 350) productControls.start(ProductAnimation);
  }, [scrollTop]);

  return (
    <Flex
      flexDirection="column"
      bgImage="bg-home-1.svg"
      opacity="1"
      w="100%"
      h="120vh"
      mt={`${10 - scrollTop * 0.01}%`}
      display="flex"
      justifyContent="center"
      bgRepeat="no-repeat"
    >
      <AnimatePresence>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={headingControls}
          transition={{ type: "just" }}
        >
          <Heading
            color="white"
            fontFamily="Sora"
            fontSize="4xl"
            mt="12rem"
            mb="4rem"
            textAlign="center"
          >
            Our Products
          </Heading>
        </m.div>
      </AnimatePresence>
      <Box display="flex" justifyContent="center">
        <Image src="our-product-line.svg" w="70%" />
      </Box>
      <AnimatePresence>
        <m.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={productControls}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Flex flexDirection="row" gridGap="7rem" ml="5rem">
            <Box w="496px" h="592px" bg="#4565C9" borderRadius="xl"></Box>
            <Box w="496px" h="592px" bg="#4565C9" borderRadius="xl"></Box>
            <Box w="496px" h="592px" bg="#4565C9" borderRadius="xl"></Box>
          </Flex>
        </m.div>
      </AnimatePresence>
    </Flex>
  );
};

const Section3 = () => {
  return (
    <Flex flexDirection="row" gridGap="5rem" w="100%">
      <Flex
        flexDirection="column"
        gridGap="5rem"
        ml="12rem"
        mt="10rem"
        flex="1"
      >
        <Flex flexDirection="column" gridGap="1.5rem">
          <Heading fontFamily="Sora" fontSize="5xl" color="primary.500">
            Why CND E-kart ?
          </Heading>
          <Box bg="#4565C9" w="15rem" h="0.4rem" borderRadius="sm" />
        </Flex>
        <Text fontSize="2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam
          ultricies ipsum ut porttitor. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Cras sollicitudin dapibus tortor, a scelerisque massa
          mattis eget. Donec in nunc vel diam pellentesque condimentum. Donec
          tincidunt lorem felis. In efficitur blandit eros, sit amet convallis
          lectus vulputate vitae. Donec id lacinia urna.
        </Text>
        <Text fontSize="2xl">
          Proin cursus pellentesque convallis. Fusce interdum leo ut risus
          laoreet condimentum. Ut at ligula sit amet neque faucibus aliquet eget
          in ex. Sed ac magna sit amet tortor scelerisque malesuada a malesuada
          ex. Curabitur sem enim, dignissim cursus arcu et, luctus commodo
          ipsum.
        </Text>
      </Flex>
      <Image src="about.svg" flex="1" mt="5rem" />
    </Flex>
  );
};

const Section4 = () => {
  return (
    <Box
      mt="6rem"
      bgImage="clients-bg.svg"
      w="100%"
      h="1200px"
      bgRepeat="no-repeat"
      position="relative"
    >
      <Flex flexDirection="column" gridGap="1rem" ml="12rem">
        <Heading fontFamily="Sora" fontSize="5xl" color="white" pt="6rem">
          Our Clients
        </Heading>
        <Box bg="#8196DA" w="10rem" h="0.4rem" borderRadius="sm" />
      </Flex>
    </Box>
  );
};

const Home: NextPage = () => {
  const { scrollTop } = useScroll();

  return (
    <LazyMotion features={domAnimation}>
      <Box overflow="clip">
        <LeftBar h="310vh" />
        <Section1 scrollTop={scrollTop} />
        <Section2 scrollTop={scrollTop} />
        <Section3 />
        <Section4 />
      </Box>
    </LazyMotion>
  );
};

export default Home;
