import React, { useContext } from "react";
import { HStack, Container, Image, ContainerProps } from "@chakra-ui/react";
import constants from "../../../util/Constants";
import { ProductInfoContext } from "../../../context/ProductInfoContext";
import { scrollBarStyle } from "../../../util/ScrollBarStyle";
import CustomContainer from "../../Custom/CustomContainer";

const createImageUrl = (url: string, image: File | undefined): string =>
  image
    ? URL.createObjectURL(image)
    : `${constants.url?.substring(0, constants?.url.lastIndexOf("/"))}${url}`;

const ImageGallery = ({ ...props }: ContainerProps) => {
  const { productInfo } = useContext(ProductInfoContext);
  const [product] = productInfo;

  return product ? (
    <CustomContainer
      // boxShadow="0.2em 0.2em 0.2em 0.2em #e1e1e1"
      width="30em"
      height="10em"
      marginTop="1em"
      borderRadius="lg"
      overflowX="scroll"
      overflowY="hidden"
      sx={scrollBarStyle}
      interactive
      {...props}
    >
      <HStack height="inherit">
        {product.image ? (
          product.image.map(({ image }: any) => (
            <Image
              src={createImageUrl(image, undefined)}
              boxSize="10em"
              fit="contain"
              padding="2em"
              cursor="pointer"
            />
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
