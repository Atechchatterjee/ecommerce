import { FieldAttributes } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

export const CustomField: React.FC<FieldAttributes<any>> = ({
  label,
  ...props
}) => {
  return (
    <FormControl isRequired style={{ width: "inherit" }}>
      {label ? (
        <FormLabel style={{ fontSize: "0.87em" }}>{label}</FormLabel>
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
