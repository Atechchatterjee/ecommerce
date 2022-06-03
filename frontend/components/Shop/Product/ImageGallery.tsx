import React, { useState, useContext } from "react";
import { Button, Image, ContainerProps, Box, Flex } from "@chakra-ui/react";
import { ProductInfoContext } from "../../../context/ProductInfoContext";
import { scrollBarStyle } from "../../../util/ScrollBarStyle";
import { createImageUrl } from "../../../util/CreateImageUrl";
import { IoMdClose } from "react-icons/io";
import CustomContainer from "../../Custom/CustomContainer";
import constants from "../../../util/Constants";

interface ImageGalleryProps extends ContainerProps {
  selectCb?: (indx: number) => void;
  allowEdit?: boolean;
}

const ImageGallery = ({ allowEdit, selectCb, ...props }: ImageGalleryProps) => {
  const { productInfo } = useContext(ProductInfoContext);
  const [edit, setEdit] = useState<boolean>(false);
  const [product] = productInfo;

  return (
    product && (
      <CustomContainer
        width="30em"
        height="10em"
        marginTop="1em"
        borderRadius="lg"
        overflowX="auto"
        overflowY="hidden"
        sx={scrollBarStyle()}
        interactive
        {...props}
      >
        <Flex
          height="inherit"
          w="100%"
          flexDirection="row"
          position="relative"
          overflowX="auto"
          sx={scrollBarStyle()}
        >
          {product.image ? (
            product.image.map(({ image }: any, indx) => (
              <Box key={indx} h="100%">
                {allowEdit && edit ? (
                  <Button
                    position="absolute"
                    top="5%"
                    right="0"
                    variant="outline"
                    borderRadius="full"
                    padding="0"
                    size="xs"
                    _focus={{ outline: "none" }}
                    _hover={{ color: "white", bgColor: "primary.200" }}
                    _active={{ bgColor: "primary.500" }}
                    transition="all ease-in-out 0.3s"
                  >
                    <IoMdClose size={13} />
                  </Button>
                ) : (
                  <></>
                )}
                <Image
                  fallbackSrc={constants.fallbackURL}
                  key={indx}
                  src={createImageUrl(image, undefined)}
                  boxSize={allowEdit && edit ? "105%" : "100%"}
                  w="120"
                  fit="contain"
                  padding="2em 0.4em"
                  cursor="pointer"
                  onClick={() => selectCb?.(indx)}
                  onDoubleClick={() => setEdit(!edit)}
                  transition="all ease-in-out 0.2s"
                />
              </Box>
            ))
          ) : (
            <></>
          )}
        </Flex>
      </CustomContainer>
    )
  );
};

export default ImageGallery;
