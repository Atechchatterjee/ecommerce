import React, { useContext, useEffect, useState } from "react";
import { Image, Fade, Flex, Button } from "@chakra-ui/react";
import { ProductContext } from "../../../context/ProductContext";
import constants from "../../../util/Constants";
import ProductDescription from "./ProductDescription";
import UploadBtn from "./UploadBtn";
import CustomContainer from "../../../components/Custom/CustomContainer";
import Rating from "../../Widgets/Rating";
import { createImageUrl } from "../../../util/CreateImageUrl";
import { FaTrash } from "react-icons/fa";
import { ProductInfoContext } from "../../../context/ProductInfoContext";

interface Props {
  editable?: boolean;
  onDelete?: Function;
}

const Product: React.FC<Props> = ({ editable, onDelete }) => {
  const [edit, setEdit] = useState<boolean>(false); // toggles the edit mode
  const [triggerUpload, setTriggerUpload] = useState<boolean>(false);
  const [changedImage, setChangedImage] = useState<File | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const { productInfo } = useContext(ProductInfoContext);
  const [product] = productInfo;

  useEffect(() => {
    setTimeout(() => setLoading(false), 100);
  }, []);

  return (
    <Fade in={!loading}>
      <CustomContainer
        height="35em"
        minWidth="20em"
        maxWidth="30em"
        padding="0 2%"
        position="relative"
        borderRadius="lg"
        interactive
        reverseEffect
      >
        {editable && (
          <Button
            variant="unstyled"
            mt="0.3rem"
            color="primary.200"
            _hover={{ color: "secondary.200" }}
            _focus={{ outline: "none" }}
            position="absolute"
            alignContent="center"
            right="0rem"
            onClick={() => (onDelete ? onDelete() : null)}
          >
            <FaTrash />
          </Button>
        )}
        <Flex flexDirection="column">
          <ProductContext.Provider
            value={{
              edit,
              setEdit,
              changedImage,
              setChangedImage,
              triggerUpload,
              setTriggerUpload,
            }}
          >
            <Image
              padding="2em"
              objectFit="scale-down"
              userSelect="none"
              src={createImageUrl(
                !!product.image
                  ? !!product.image[0]
                    ? product.image[0].image
                    : ""
                  : "",
                changedImage
              )}
              fallbackSrc={constants.fallbackURL}
              width="full"
              height="15em"
              zIndex={-1}
              cursor={edit ? "pointer" : "auto"}
            />
            {edit ? <UploadBtn /> : <></>}
            <ProductDescription
              height={editable ? "14em" : "17em"}
              overflowX="hidden"
              overflowY="hidden"
            />
            <Rating
              position="absolute"
              left="1em"
              bottom="1em"
              rating={Math.random() * 5 + 2}
              numberOfReviews={Math.floor(Math.random() * 1000 + 10)}
            />
          </ProductContext.Provider>
        </Flex>
      </CustomContainer>
    </Fade>
  );
};

export default Product;
