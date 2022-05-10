import React, { useEffect, useState, useRef } from "react";
import { HStack, Text, Container, Image, Input, Fade } from "@chakra-ui/react";
import { ContainerProps } from "@chakra-ui/react";
import { RiFolderUploadFill } from "react-icons/ri";
import constants from "../../util/Constants";

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
    <Container width="35em" height="inherit" minHeight="10%" {...props}>
      <Container
        width="100%"
        height="inherit"
        minHeight="10em"
        paddingBottom={uploadedFiles.length === 0 ? "6em" : "1em"}
        _hover={{ borderColor: "primary.100" }}
        border="3px dashed"
        borderColor="primary.800"
        bgRepeat="no-repeat"
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={handleDrop}
        onClick={() => {
          if (fileInputRef.current) fileInputRef.current.click();
        }}
        cursor="pointer"
        position="relative"
        borderRadius="lg"
        transition="all ease-in-out 0.2s"
      >
        {uploadedFiles.length === 0 ? (
          <Text
            position="absolute"
            top="27%"
            left="47%"
            fontWeight="semibold"
            fontSize="1.2em"
            _hover={{ color: "primary.100" }}
            color="primary.800"
            fontFamily="Sora"
            transition="all ease-in-out 0.1s"
            display="flex"
            flexDirection="column"
          >
            <RiFolderUploadFill size="10%" />
            <Text ml="-20%" mt="2%" fontFamily="Sora">
              Drop Files Here
            </Text>
          </Text>
        ) : (
          <></>
        )}
        <DummyInput />
        {uploadedFiles.map((file, indx) => (
          <HStack marginTop="1em" key={indx} transition="all ease-in-out 0.3s">
            <ImagePreview imageFile={file} />
            <Text>{file.name}</Text>
          </HStack>
        ))}
      </Container>
    </Container>
  );
};

export default DragUpload;
