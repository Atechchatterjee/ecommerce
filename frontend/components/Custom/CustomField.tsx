import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";
import React from "react";

interface CustomFieldProps extends InputProps {
  label?: string;
}

export const CustomField = ({
  isRequired,
  label,
  mt,
  ...props
}: CustomFieldProps) => {
  return (
    <FormControl
      isRequired={isRequired}
      width="inherit"
      mt={mt}
      color="gray.500"
    >
      {label ? (
        <FormLabel fontSize="0.87em" fontFamily="Sora">
          {label}
        </FormLabel>
      ) : (
        <></>
      )}
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
