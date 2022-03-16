import React from "react";
import { Editable, EditablePreview, EditableInput } from "@chakra-ui/react";

const CustomEditable: React.FC<{
  text: string;
  onChange?: (_: string) => void;
  textArea?: boolean;
}> = ({ text, onChange, textArea }) => {
  return (
    <Editable
      defaultValue={text}
      onChange={(changedVal) => {
        if (onChange) onChange(changedVal);
      }}
    >
      <EditablePreview />
      <EditableInput {...(textArea ? { as: "textarea", height: "7em" } : {})} />
    </Editable>
  );
};

export default CustomEditable;
