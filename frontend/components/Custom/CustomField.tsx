import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputProps,
  Spinner,
} from "@chakra-ui/react";
import React from "react";

interface CustomFieldProps extends InputProps {
  label?: string;
  isLoading?: boolean;
}

export const CustomField = ({
  isRequired,
  label,
  mt,
  isLoading,
  ...props
}: CustomFieldProps) => {
  return (
    <FormControl
      isRequired={isRequired}
      width="inherit"
      mt={mt}
      color="gray.500"
    >
      {label ? <FormLabel fontSize="0.87em">{label}</FormLabel> : <></>}
      {isLoading ? (
        <Flex flexDirection="row" gridGap={3}>
          <Input
            flex="1"
            variant="outline"
            size="md"
            borderRadius="sm"
            focusBorderColor="secondary.200"
            errorBorderColor="red.300"
            fontSize={{ base: "13px", md: "15px", lg: "16px" }}
            {...props}
          />
          <Spinner size="md" mt="2%" />
        </Flex>
      ) : (
        <Input
          variant="outline"
          size="md"
          borderRadius="sm"
          focusBorderColor="secondary.200"
          errorBorderColor="red.300"
          fontSize={{ base: "13px", md: "15px", lg: "16px" }}
          {...props}
        />
      )}
    </FormControl>
  );
};
