import React, { useEffect, useState } from "react";
import { Image, Fade, Flex } from "@chakra-ui/react";
import { ProductContext } from "../../../context/ProductContext";
import constants from "../../../util/Constants";
import ProductDescription from "./ProductDescription";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";
import UploadBtn from "./UploadBtn";
import CustomContainer from "../../../components/Custom/CustomContainer";
import Rating from "../../Widgets/Rating";
import { createImageUrl } from "../../../util/CreateImageUrl";

interface Props {
  id: number;
  name: string;
  description: string;
  price: string;
  image: any;
  editable?: boolean;
  cb?: (
    id: number,
    name: string,
    description: string,
    price: string,
    image?: File
  ) => void;
  onDelete?: Function;
}

const Product: React.FC<Props> = ({
  id,
  name,
  description,
  price,
  image,
  editable,
  cb,
  onDelete,
}) => {
  const [edit, setEdit] = useState<boolean>(false); // toggles the edit mode
  const [triggerUpload, setTriggerUpload] = useState<boolean>(false);
  const [changedImage, setChangedImage] = useState<File | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

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
                !!image ? (!!image[0] ? image[0].image : "") : "",
                changedImage
              )}
              fallbackSrc={constants.fallbackURL}
              width="full"
              height="15em"
              zIndex={1}
              cursor={edit ? "pointer" : "auto"}
            />
            {edit ? <UploadBtn /> : <></>}
            <ProductDescription
              productId={id}
              name={name}
              description={description}
              price={price}
              cb={(id, name, description, price) => {
                if (cb) cb(id, name, description, price, changedImage);
              }}
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
