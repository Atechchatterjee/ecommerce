import React, { useEffect, useState, useRef } from "react";
import {
  HStack,
  Text,
  Container,
  Image,
  Input,
  Button,
  forwardRef,
} from "@chakra-ui/react";
import { ContainerProps } from "@chakra-ui/react";

const ImagePreview: React.FC<{ imageFile: File }> = ({ imageFile }) => (
  <Image src={URL.createObjectURL(imageFile)} fit="contain" boxSize="5em" />
);

interface Props extends ContainerProps {
  onFileUpload?: (files: File[]) => void;
}

const DragUpload = ({ onFileUpload, ...props }: Props) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<any>(null);

  useEffect(() => {
    if (onFileUpload) onFileUpload(uploadedFiles);
  }, [uploadedFiles]);

  const saveImagesToState = (files: FileList) => {
    const filesArray: File[] = Array.from(files).filter(
      (file) => file.type === "image/jpg" || "image/png" || "images/webp"
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
        onChange={(event) => {
          if (event.target.files) saveImagesToState(event.target.files);
        }}
      />
    );
  };

  return (
    <Container width="35em" {...props}>
      <Container
        height="inherit"
        paddingBottom={uploadedFiles.length === 0 ? "6em" : "1em"}
        border="0.15em dashed"
        borderColor="secondaryPink.200"
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={handleDrop}
        onClick={() => {
          if (fileInputRef.current) fileInputRef.current.click();
        }}
        cursor="pointer"
        _hover={{ borderColor: "#D6C2ED" }}
        position="relative"
        borderRadius="lg"
      >
        {uploadedFiles.length === 0 ? (
          <Text
            position="absolute"
            top="35%"
            left="35%"
            fontWeight="semibold"
            fontSize="1.2em"
            textColor="secondaryBlue.200"
            fontFamily="Sora"
            _hover={{ textColor: "#525E99" }}
          >
            Drop Files Here
          </Text>
        ) : (
          <></>
        )}
        <DummyInput />
        {uploadedFiles.map((file) => (
          <HStack marginTop="1em">
            <ImagePreview imageFile={file} />
            <Text>{file.name}</Text>
          </HStack>
        ))}
      </Container>
    </Container>
  );
};

export default DragUpload;
