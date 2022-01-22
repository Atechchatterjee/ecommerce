import {
  Container,
  Button,
  Heading,
  Tag,
  Editable,
  EditableInput,
  EditablePreview,
  Text,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { UploadContext } from "../../../context/UploadContext";
import Upload from "../../Custom/Upload";
import { ProductContext } from "../../../context/ProductContext";

const CustomEditable: React.FC<{
  text: string;
  onChange?: (_: string) => void;
}> = ({ text, onChange }) => {
  return (
    <Editable
      defaultValue={text}
      onChange={(changedVal) => {
        if (onChange) onChange(changedVal);
      }}
    >
      <EditablePreview />
      <EditableInput />
    </Editable>
  );
};

interface Props {
  cb?: (id: number, name: string, description: string, price: string) => void;
  id: number;
  name: string;
  description: string;
  price: string;
}

const ProductDescription = ({ cb, id, name, description, price }: Props) => {
  const [changedName, setChangedName] = useState<string>(name);
  const [changedDesc, setChangedDesc] = useState<string>(description);
  const [changedPrice, setChangedPrice] = useState<string>(price);

  const {
    edit,
    setEdit,
    triggerUpload,
    setTriggerUpload,
    changedImage,
    setChangedImage,
  } = useContext(ProductContext);

  if (edit) {
    // edit mode
    return (
      <Container width="full" height="initial" padding="1.5em">
        <CustomEditable
          text={changedName}
          onChange={(name: string) => setChangedName(name)}
        />
        <CustomEditable
          text={changedDesc}
          onChange={(description: string) => setChangedDesc(description)}
        />
        <CustomEditable
          text={changedPrice}
          onChange={(price: string) => setChangedPrice(price)}
        />
        <UploadContext.Provider
          value={{
            triggerUpload,
            setTriggerUpload,
          }}
        >
          <Upload
            getFile={(image) => {
              console.log("update pictures file: ", image);
              setChangedImage(image);
              setTriggerUpload(false);
            }}
          />
        </UploadContext.Provider>
        <Button
          variant="pinkSolid"
          size="sm"
          borderRadius="3xl"
          position="absolute"
          padding="1em"
          bottom="1em"
          right="1em"
          _hover={{ bg: "#B096CE" }}
          onClick={() => {
            if (cb) {
              console.log("callback changedImage: ", changedImage);
              cb(id, changedName, changedDesc, changedPrice);
            }
            setEdit(false);
          }}
        >
          Save
        </Button>
      </Container>
    );
  } else {
    // normal display mode
    return (
      <Container width="full" height="initial" padding="1em">
        <Heading
          fontFamily="Sora"
          fontWeight="semibold"
          size="lg"
          cursor="pointer"
          _hover={{ color: "#C75E0E" }}
        >
          {name}
        </Heading>
        <br />
        <Text color="#2c2c2c">{description}</Text>
        <Tag
          size="md"
          bgColor="#9D84B7"
          textColor="white"
          position="absolute"
          right="1em"
          bottom="1em"
        >
          <Text fontWeight="bold">₹{price}</Text>
        </Tag>
      </Container>
    );
  }
};

export default ProductDescription;
