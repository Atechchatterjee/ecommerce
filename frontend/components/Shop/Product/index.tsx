import React, { useState } from "react";
import { Image, Container } from "@chakra-ui/react";
import { ProductContext } from "../../../context/ProductContext";
import constants from "../../../util/Constants";
import ProductDescription from "./ProductDescription";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";
import UploadBtn from "./UploadBtn";

interface Props {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
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

  return (
    <Container
      height="40em"
      width="30em"
      boxShadow="0.2em 0.2em 0.2em 0.2em #e1e1e1"
      padding="0"
      position="relative"
      borderRadius="lg"
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
          src={createImageUrl(image, changedImage)}
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
      </ProductContext.Provider>
    </Container>
  );
};

export default Product;
