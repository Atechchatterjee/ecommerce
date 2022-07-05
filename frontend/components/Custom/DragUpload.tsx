import React, { useEffect, useState, useRef } from "react";
import {
  HStack,
  Text,
  Container,
  Image,
  Input,
  Fade,
  Flex,
  Box,
} from "@chakra-ui/react";
import { ContainerProps } from "@chakra-ui/react";
import { RiFolderUploadFill } from "react-icons/ri";
import constants from "../../util/Constants";

// showing the image preivew of the uploaded image
const ImagePreview: React.FC<{ imageFile: File }> = ({ imageFile }) => (
  <Fade in={true}>
    <Image
      src={URL.createObjectURL(imageFile)}
      fallbackSrc={constants.fallbackURL}
      fit="contain"
      boxSize="5em"
      transition="all ease-in-out 0.2s"
    />
  </Fade>
);

interface Props extends ContainerProps {
  onFileUpload?: (files: File[]) => void;
  clearUpload: [
    clearUploadFiles: boolean,
    setClearUploadFiles: (_: boolean) => void
  ];
}

const DragUpload = ({ onFileUpload, clearUpload, ...props }: Props) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<any>(null);
  const [clearUploadFiles, setClearUploadFiles] = clearUpload;

  useEffect(() => {
    if (onFileUpload && uploadedFiles) onFileUpload(uploadedFiles);
  }, [uploadedFiles]);

  useEffect(() => {
    if (clearUploadFiles) {
      setUploadedFiles([]);
      setClearUploadFiles(false);
    }
  }, [clearUploadFiles, setClearUploadFiles]);

  const saveImagesToState = (files: FileList) => {
    const filesArray: File[] = Array.from(files).filter(
      (file) => file.type == "image/png" || "image/jpg" || "images/webp"
    );
    setUploadedFiles([...uploadedFiles, ...filesArray]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    saveImagesToState(event.dataTransfer.files);
  };

  const DummyInput: React.FC = () => {
    return (
      <Input
        ref={fileInputRef}
        type="file"
        display="none"
        onChange={(event: any) => {
          if (event.target.files) saveImagesToState(event.target.files);
        }}
      />
    );
  };

  return (
    <Container
      width="100%"
      height="auto"
      minH="15vh"
      _hover={{ borderColor: "primary.100" }}
      border="3px dashed"
      borderColor="primary.800"
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={handleDrop}
      onClick={() => {
        if (fileInputRef.current) fileInputRef.current.click();
      }}
      cursor="pointer"
      borderRadius="lg"
      transition="all ease-in-out 0.2s"
      {...props}
    >
      {uploadedFiles.length === 0 ? (
        <Flex
          mt="4.5vh"
          fontWeight="bold"
          fontSize="1.2em"
          _hover={{ color: "primary.100" }}
          color="primary.500"
          fontFamily="Nunito"
          transition="all ease-in-out 0.1s"
          flexDirection="column"
        >
          <RiFolderUploadFill
            style={{
              marginLeft: "47%",
            }}
          />
          <Text
            textAlign="center"
            justifyContent="center"
            alignContent="center"
            fontFamily="Nunito"
            fontWeight="bold"
            fontSize={{ base: "0.75em", md: "0.8em", lg: "1em" }}
          >
            Drop Files Here
          </Text>
        </Flex>
      ) : (
        <></>
      )}
      <DummyInput />
      <Flex
        position="relative"
        height="inherit"
        flexDirection="column"
        mb={uploadedFiles.length > 0 ? "4vh" : "0"}
      >
        {uploadedFiles.map((file, indx) => (
          <HStack marginTop="1em" key={indx} position="relative">
            <ImagePreview imageFile={file} />
            <Text>{file.name}</Text>
          </HStack>
        ))}
      </Flex>
    </Container>
  );
};

export default DragUpload;
