import React, { useEffect, useState } from "react";
import { HStack, Container, Image } from "@chakra-ui/react";
import constants from "../../../util/Constants";

const createImageUrl = (url: string, image: File | undefined): string =>
  image
    ? URL.createObjectURL(image)
    : `${constants.url?.substring(0, constants?.url.lastIndexOf("/"))}${url}`;

const ImageGallery: React.FC<{ product: any }> = ({ product }) => {
  return (
    <Container
      boxShadow="0.2em 0.2em 0.2em 0.2em #e1e1e1"
      width="30em"
      height="10em"
      marginTop="1em"
      borderRadius="lg"
      overflowX="scroll"
      overflowY="hidden"
      sx={{
        "&::-webkit-scrollbar": {
          width: "7px",
          height: "0.5em",
          borderRadius: "7px",
        },
        "&::-webkit-scrollbar-thumb": {
          width: "2px",
          height: "1em",
          borderRadius: "7px",
          backgroundColor: `#b199cc`,
        },
      }}
    >
      <HStack height="inherit">
        {product ? (
          product.image.map(({ image }: any) => (
            <Image
              src={createImageUrl(image, undefined)}
              boxSize="9em"
              fit="contain"
              padding="1em"
              cursor="pointer"
            />
          ))
        ) : (
          <></>
        )}
      </HStack>
    </Container>
  );
};

export default ImageGallery;
