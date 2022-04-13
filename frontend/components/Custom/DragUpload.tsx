import React, { useEffect, useState, useRef } from "react";
import { HStack, Text, Container, Image, Input, Fade } from "@chakra-ui/react";
import { ContainerProps } from "@chakra-ui/react";
import { RiFolderUploadFill } from "react-icons/ri";

const ImagePreview: React.FC<{ imageFile: File }> = ({ imageFile }) => (
  <Fade in={true}>
    <Image
      src={URL.createObjectURL(imageFile)}
      fallbackSrc="https://jkfenner.com/wp-content/uploads/2019/11/default.jpg"
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
        onChange={(event: any) => {
          if (event.target.files) saveImagesToState(event.target.files);
        }}
      />
    );
  };

  return (
    <Container width="35em" {...props} height="initial" minHeight="10%">
      <Container
        height="inherit"
        minHeight="10em"
        paddingBottom={uploadedFiles.length === 0 ? "6em" : "1em"}
        bgImage="/dashed-border-bg.jpg"
        bgSize="contain"
        bgRepeat="no-repeat"
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={handleDrop}
        onClick={() => {
          if (fileInputRef.current) fileInputRef.current.click();
        }}
        opacity={hover ? "0.85" : "0.95"}
        cursor="pointer"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        position="relative"
        borderRadius="lg"
        transition="all ease-in-out 0.5s"
      >
        {uploadedFiles.length === 0 ? (
          <Text
            position="absolute"
            top="27%"
            left="47%"
            fontWeight="semibold"
            fontSize="1.2em"
            textColor={hover ? "#525E99" : "primary.900"}
            fontFamily="Sora"
            transition="all ease-in-out 0.5s"
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
          <HStack marginTop="1em" key={indx}>
            <ImagePreview imageFile={file} />
            <Text>{file.name}</Text>
          </HStack>
        ))}
      </Container>
    </Container>
  );
};

export default DragUpload;
