import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";
import React from "react";

interface CustomFieldProps extends InputProps {
  label?: string;
}

export const CustomField = ({ label, ...props }: CustomFieldProps) => {
  return (
    <FormControl isRequired width="inherit">
      {label ? <FormLabel fontSize="0.87em">{label}</FormLabel> : <></>}
      <Input
        variant="outline"
        size="md"
        borderRadius="sm"
        focusBorderColor="secondary.200"
        errorBorderColor="red.300"
        {...props}
      />
    </FormControl>
  );
};
