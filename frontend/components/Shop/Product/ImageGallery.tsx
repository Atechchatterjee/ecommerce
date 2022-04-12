import React, { useContext } from "react";
import { Button, HStack, Image, ContainerProps, Box } from "@chakra-ui/react";
import constants from "../../../util/Constants";
import { ProductInfoContext } from "../../../context/ProductInfoContext";
import { scrollBarStyle } from "../../../util/ScrollBarStyle";
import CustomContainer from "../../Custom/CustomContainer";
import { createImageUrl } from "../../../util/CreateImageUrl";
import { IoMdClose } from "react-icons/io";

interface ImageGalleryProps extends ContainerProps {
  selectCb?: (indx: number) => void;
}

const ImageGallery = ({ selectCb, ...props }: ImageGalleryProps) => {
  const { productInfo } = useContext(ProductInfoContext);
  const [product] = productInfo;

  return product ? (
    <CustomContainer
      width="30em"
      height="10em"
      marginTop="1em"
      borderRadius="lg"
      overflowX="scroll"
      overflowY="hidden"
      sx={scrollBarStyle()}
      interactive
      {...props}
    >
      <HStack height="inherit" position="relative">
        {product.image ? (
          product.image.map(({ image }: any, indx) => (
            <Box key={indx} position="relative" w="100%" h="100%">
              <Button
                position="absolute"
                top="5%"
                right="0"
                variant="outline"
                borderRadius="full"
                padding="0"
                size="xs"
                _focus={{ outline: "none" }}
                _hover={{ color: "white", bgColor: "secondary.200" }}
              >
                <IoMdClose size={13} />
              </Button>
              <Image
                fallbackSrc={constants.fallbackURL}
                key={indx}
                src={createImageUrl(image, undefined)}
                boxSize="115%"
                w="120"
                fit="contain"
                padding="1.5em"
                cursor="pointer"
                onClick={() => selectCb?.(indx)}
              />
            </Box>
          ))
        ) : (
          <></>
        )}
      </HStack>
    </CustomContainer>
  ) : (
    <></>
  );
};

export default ImageGallery;
