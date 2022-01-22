import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { ImUpload3 } from "react-icons/im";
import { ProductContext } from "../../../context/ProductContext";

const UploadBtn: React.FC = () => {
  const { edit, setTriggerUpload } = useContext(ProductContext);
  return (
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
  );
};

export default UploadBtn;
