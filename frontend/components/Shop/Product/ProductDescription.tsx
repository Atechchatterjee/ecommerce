import {
  Container,
  Box,
  Button,
  Tag,
  Text,
  ContainerProps,
  Flex,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { UploadContext } from "../../../context/UploadContext";
import Upload from "../../Custom/Upload";
import { ProductContext } from "../../../context/ProductContext";
import CustomEditable from "./CustomEditable";
import { UserContext } from "../../../context/UserContext";

interface Props extends ContainerProps {
  productId: number;
  name: string;
  description: string;
  price: string;
  cb?: (id: number, name: string, description: string, price: string) => void;
}

const EditMode = ({
  productId,
  name,
  description,
  price,
  cb,
  ...props
}: Props) => {
  const [changedName, setChangedName] = useState<string>(name);
  const [changedDesc, setChangedDesc] = useState<string>(description);
  const [changedPrice, setChangedPrice] = useState<string>(price);
  const { triggerUpload, setTriggerUpload, setChangedImage, setEdit } =
    useContext(ProductContext);

  return (
    <Container width="full" height="initial" padding="1.5em" {...props}>
      <CustomEditable
        text={changedName}
        onChange={(name: string) => setChangedName(name)}
      />
      <CustomEditable
        text={changedDesc}
        onChange={(description: string) => setChangedDesc(description)}
        textArea
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
            cb(productId, changedName, changedDesc, changedPrice);
          }
          setEdit(false);
        }}
      >
        Save
      </Button>
    </Container>
  );
};

const NormalMode = ({
  productId,
  name,
  description,
  price,
  ...props
}: Props) => {
  const { admin } = useContext(UserContext);
  return (
    <Container width="full" height="initial" padding="1em" {...props}>
      <Flex flexDirection="column">
        <Text
          fontFamily="Sora"
          overflow="hidden"
          flexWrap="nowrap"
          fontWeight="semibold"
          color="secondaryBlue.900"
          fontSize="1.4em"
          cursor="pointer"
          _hover={{ color: "secondaryPink.200" }}
          onClick={() => {
            if (!admin) window.location.assign(`/shop/${productId}`);
            else
              window.location.assign(
                `/admin/catalogs/all-products/${productId}`
              );
          }}
        >
          {name}
        </Text>
        <br />
        <Box height="9em">
          <Text color="#2c2c2c" height="inherit" noOfLines={5} lineHeight="7">
            {description}
          </Text>
        </Box>
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
      </Flex>
    </Container>
  );
};

const ProductDescription: React.FC<Props> = (props) => {
  const { edit } = useContext(ProductContext);

  return edit ? <EditMode {...props} /> : <NormalMode {...props} />;
};

export default ProductDescription;
