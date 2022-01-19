import { Button, Input } from "@chakra-ui/react";
import React, { useState, useRef } from "react";

interface Props {
  customText?: string;
  width?: string;
  marginTop?: string;
  colorScheme?: string;
  borderRadius?: string;
  onChange?: (_: File) => void;
  bgColor?: string;
}

const CustomFileInput: React.FC<Props> = ({
  customText,
  width,
  marginTop,
  onChange,
  colorScheme,
  borderRadius,
  bgColor,
}) => {
  const fileInput = useRef<any>(null);
  const [selectedFile, setSelectedFile] = useState<File>();

  return (
    <div>
      <Input
        display="none"
        ref={fileInput}
        type="file"
        onChange={(event: any) => {
          const file: File = event.target.files[0];
          setSelectedFile(file);
          if (onChange) onChange(file);
        }}
      />
      <Button
        bgColor={bgColor ? bgColor : "teal"}
        borderRadius={borderRadius ? borderRadius : "md"}
        width={width}
        colorScheme={colorScheme}
        marginTop={marginTop}
        onClick={() => {
          fileInput.current.click();
        }}
      >
        {customText ? (selectedFile ? "Uploaded" : customText) : "Select File"}
        {selectedFile ? " : ".concat(selectedFile.name) : ""}
      </Button>
    </div>
  );
};

export default CustomFileInput;
