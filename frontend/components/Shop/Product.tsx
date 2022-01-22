import {
  Image,
  Tag,
  Text,
  Button,
  Heading,
  Editable,
  Container,
  EditableInput,
  EditablePreview,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RiEditBoxFill, RiEditBoxLine } from "react-icons/ri";
import { ImUpload3 } from "react-icons/im";
import { BsFillTrashFill } from "react-icons/bs";
import Upload from "../Custom/Upload";
import { UploadContext } from "../../context/UploadContext";
import constants from "../../util/Constants";

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

  const ProductDescription = ({
    cb,
  }: {
    cb?: (id: number, name: string, description: string, price: string) => void;
  }) => {
    const [changedName, setChangedName] = useState<string>(name);
    const [changedDesc, setChangedDesc] = useState<string>(description);
    const [changedPrice, setChangedPrice] = useState<string>(price);

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
          <UploadContext.Provider value={{ triggerUpload, setTriggerUpload }}>
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

  const EditBtn: React.FC = () => {
    if (!edit)
      return (
        <Tooltip label="Edit">
          <span style={{ float: "right" }}>
            <RiEditBoxLine
              color={"#091353"}
              size="20"
              style={{
                float: "right",
                cursor: "pointer",
                marginRight: "0.5em",
                marginTop: "0.5em",
              }}
              onClick={() => {
                setEdit(!edit);
                setTriggerUpload(false);
              }}
            />
          </span>
        </Tooltip>
      );
    else
      return (
        <Tooltip label="Edit">
          <span style={{ float: "right" }}>
            <RiEditBoxFill
              color={"#091353"}
              size="20"
              style={{
                float: "right",
                cursor: "pointer",
                marginRight: "0.5em",
                marginTop: "0.5em",
              }}
              onClick={() => {
                setEdit(!edit);
              }}
            />
          </span>
        </Tooltip>
      );
  };

  return (
    <Container
      height="40em"
      width="30em"
      boxShadow="0.2em 0.2em 0.2em 0.2em #e1e1e1"
      padding="0"
      position="relative"
      borderRadius="lg"
    >
      {editable ? (
        <>
          <EditBtn />
          <Tooltip label="Delete">
            <span style={{ float: "right" }}>
              <BsFillTrashFill
                style={{
                  float: "right",
                  marginTop: "0.56em",
                  marginRight: "0.5em",
                }}
                size="18"
                color="#BF3E3D"
                cursor="pointer"
                onClick={() => {
                  if (onDelete) onDelete();
                }}
              />
            </span>
          </Tooltip>
        </>
      ) : (
        <></>
      )}
      <Image
        padding="2em"
        objectFit="scale-down"
        src={`${constants.url?.substring(
          0,
          constants?.url.lastIndexOf("/")
        )}${image}`}
        width="full"
        height="20em"
        cursor={edit ? "pointer" : "auto"}
      />
      {edit ? (
        <Button
          variant="solid"
          bgColor="#3F3F3F"
          color="white"
          opacity="0.4"
          size="md"
          position="absolute"
          marginTop="-13em"
          marginLeft="13em"
          _hover={{ opacity: "0.9" }}
          onClick={() => {
            if (edit) {
              setTriggerUpload(false);
              setTimeout(() => {
                setTriggerUpload(true);
              }, 100);
            }
          }}
        >
          <ImUpload3 />
        </Button>
      ) : (
        <></>
      )}
      <ProductDescription
        cb={(id, name, description, price) => {
          console.log(
            `id: ${id}, name: ${name}, price: ${price}, description: ${description}`
          );
          console.log("changedImage", changedImage);
          if (cb) cb(id, name, description, price, changedImage);
        }}
      />
    </Container>
  );
};

export default Product;
