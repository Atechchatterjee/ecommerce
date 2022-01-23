import React from "react";
import { Editable, EditablePreview, EditableInput } from "@chakra-ui/react";

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

export default CustomEditable;
