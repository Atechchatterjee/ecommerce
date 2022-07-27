import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Spinner,
} from "@chakra-ui/react";
import React from "react";

interface CustomFieldProps extends InputProps {
  label?: string;
  isLoading?: boolean;
  leftIcon?: string;
}

export const CustomField = ({
  isRequired,
  label,
  mt,
  isLoading,
  leftIcon,
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
          <InputGroup>
            {leftIcon && (
              <InputLeftElement
                pointerEvents="none"
                color="gray.400"
                fontSize="1.2em"
                children={leftIcon}
              />
            )}
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
            <Spinner size="md" w="1.2rem" h="1.2rem" mt="0.6rem" ml="0.5rem" />
          </InputGroup>
        </Flex>
      ) : (
        <InputGroup>
          {leftIcon && (
            <InputLeftElement
              pointerEvents="none"
              color="gray.400"
              fontSize="1.2em"
              children={leftIcon}
            />
          )}
          <Input
            variant="outline"
            size="md"
            borderRadius="sm"
            focusBorderColor="secondary.200"
            errorBorderColor="red.300"
            fontSize={{ base: "13px", md: "15px", lg: "16px" }}
            {...props}
          />
        </InputGroup>
      )}
    </FormControl>
  );
};
