import { NextPage } from "next";
import { useEffect, useState } from "react";
import { scrollBarStyle } from "../util/ScrollBarStyle";
import { Box, ContainerProps, Container } from "@chakra-ui/react";
import Cart from "../components/Checkout/Cart";
import WithAuth from "../util/WithAuth";
import Shipping from "../components/Checkout/Shipping";
import Head from "next/head";
import CustomContainer from "../components/Custom/CustomContainer";
import CheckoutSlider from "../components/Checkout/CheckoutSlider";
import { AnimatePresence, motion } from "framer-motion";

const MainContainer = ({ children, ...props }: ContainerProps) => (
  <CustomContainer
    borderRadius="lg"
    minHeight="83vh"
    maxWidth="75%"
    bg="white"
    position="absolute"
    top="15vh"
    left="12%"
    sx={scrollBarStyle()}
    {...props}
  >
    {children}
  </CustomContainer>
);

const Checkout: NextPage = () => {
  const [stageNo, setStageNo] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [stageNo]);

  return (
    <Box
      w="100%"
      h="100vh"
      position="relative"
      textAlign="center"
      overflow={loading ? "clip" : "auto"}
      sx={scrollBarStyle({})}
    >
      <Head key={0}>
        <title>Checkout</title>
      </Head>
      <Box
        w="100%"
        h="30%"
        bgColor="primary.800"
        position="absolute"
        borderRadius="0 0 3rem 3rem"
      >
        <AnimatePresence>
          <motion.div
            animate={{ x: "0%", opacity: 1 }}
            initial={{ x: "0%", opacity: 0 }}
            transition={{ type: "just" }}
          >
            <CheckoutSlider indx={[stageNo, setStageNo]} disableIndx={1} />
          </motion.div>
        </AnimatePresence>
      </Box>

      <MainContainer>
        {(() => {
          switch (stageNo) {
            case 0:
              return (
                !loading && (
                  <AnimatePresence>
                    <motion.div
                      animate={{ x: 0, y: 0, opacity: 1 }}
                      initial={{ x: -30, y: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      exit={{ x: -30 }}
                    >
                      <Cart proceed={() => setStageNo(1)} />
                    </motion.div>
                  </AnimatePresence>
                )
              );
            case 1:
              return (
                !loading && (
                  <AnimatePresence>
                    <motion.div
                      animate={{ x: 0, opacity: 1 }}
                      initial={{ x: 30, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      exit={{ x: 30 }}
                    >
                      <Shipping />
                    </motion.div>
                  </AnimatePresence>
                )
              );
          }
        })()}
      </MainContainer>
    </Box>
  );
};

export default WithAuth(Checkout);
