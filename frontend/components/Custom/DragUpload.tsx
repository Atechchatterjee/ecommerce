import React, { useEffect, useState, useRef } from "react";
import { HStack, Text, Container, Image, Input } from "@chakra-ui/react";
import { ContainerProps } from "@chakra-ui/react";

const ImagePreview: React.FC<{ imageFile: File }> = ({ imageFile }) => (
  <Image src={URL.createObjectURL(imageFile)} fit="contain" boxSize="5em" />
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
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    if (onFileUpload) onFileUpload(uploadedFiles);
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
        borderColor={hover ? "#D6C2ED" : "secondaryPink.200"}
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={handleDrop}
        onClick={() => {
          if (fileInputRef.current) fileInputRef.current.click();
        }}
        cursor="pointer"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
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
            textColor={hover ? "#525E99" : "secondaryBlue.200"}
            fontFamily="Sora"
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
