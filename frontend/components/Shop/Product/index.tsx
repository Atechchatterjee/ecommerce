import React, { useEffect, useState } from "react";
import { Image, Fade } from "@chakra-ui/react";
import { ProductContext } from "../../../context/ProductContext";
import constants from "../../../util/Constants";
import ProductDescription from "./ProductDescription";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";
import UploadBtn from "./UploadBtn";
import CustomContainer from "../../../components/Custom/CustomContainer";
import Rating from "../Rating";

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

const createImageUrl = (url: string, image: File | undefined): string =>
  image
    ? URL.createObjectURL(image)
    : `${constants.url?.substring(0, constants?.url.lastIndexOf("/"))}${url}`;

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
        height="40em"
        width="30em"
        padding="0 1em"
        position="relative"
        borderRadius="lg"
        interactive
      >
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
          {editable ? (
            <>
              <EditBtn />
              <DeleteBtn onDelete={onDelete} />
            </>
          ) : (
            <></>
          )}
          <Image
            padding="2em"
            objectFit="scale-down"
            userSelect="none"
            src={createImageUrl(
              !!image ? (!!image[0] ? image[0].image : "") : "",
              changedImage
            )}
            fallbackSrc="https://newhorizon-bsh.s3.ap-south-1.amazonaws.com/nhengineering/bsh/wp-content/uploads/2020/01/17113522/default-image.png"
            width="full"
            height="20em"
            cursor={edit ? "pointer" : "auto"}
          />
          {edit ? <UploadBtn /> : <></>}
          <ProductDescription
            id={id}
            name={name}
            description={description}
            price={price}
            cb={(id, name, description, price) => {
              if (cb) cb(id, name, description, price, changedImage);
            }}
          />
          <Rating
            position="absolute"
            left="0.3em"
            bottom="0.7em"
            rating={Math.random() * 5 + 2}
            numberOfReviews={Math.floor(Math.random() * 1000 + 10)}
          />
        </ProductContext.Provider>
      </CustomContainer>
    </Fade>
  );
};

export default Product;
