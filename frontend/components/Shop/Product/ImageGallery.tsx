import React, { useContext } from "react";
import { HStack, Image, ContainerProps } from "@chakra-ui/react";
import constants from "../../../util/Constants";
import { ProductInfoContext } from "../../../context/ProductInfoContext";
import { scrollBarStyle } from "../../../util/ScrollBarStyle";
import CustomContainer from "../../Custom/CustomContainer";
import { createImageUrl } from "../../../util/CreateImageUrl";

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
      <HStack height="inherit">
        {product.image ? (
          product.image.map(({ image }: any, indx) => (
            <Image
              fallbackSrc={constants.fallbackURL}
              key={indx}
              src={createImageUrl(image, undefined)}
              boxSize="10em"
              fit="contain"
              padding="2em"
              cursor="pointer"
              onClick={() => selectCb?.(indx)}
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
