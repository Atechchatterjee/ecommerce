import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  ContainerProps,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { scrollBarStyle } from "../../util/ScrollBarStyle";
import { CustomField } from "../Custom/CustomField";
import axios from "axios";
import { rejects } from "assert";

const getDataFromPincode = (pincode: string): Promise<any> => {
  return new Promise((resolve) => {
    axios
      .get(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((res) => {
        resolve(res.data[0].PostOffice[0]);
      })
      .catch((err) => {
        console.error(err);
        rejects(err);
      });
  });
};

const Shipping = ({ ...props }: ContainerProps) => {
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>("");

  const handlePincodeBlur = (e: any) => {
    const currentPincode: string = e.target.value;
    if (currentPincode.trim() === ("" || pincode)) return;
    setPincode(currentPincode);
    setLoading(true);
    getDataFromPincode(currentPincode)
      .then((data) => {
        setCity(data.Region);
        setState(data.State);
        setCountry(data.Country);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <Container
      borderRadius="lg"
      width="100%"
      maxWidth="75%"
      bgColor="white"
      height="83%"
      minHeight="50%"
      marginTop="4em"
      overflowX="scroll"
      sx={scrollBarStyle()}
      position="relative"
      {...props}
    >
      <FormControl width="50%" margin="5% 0 0 30%">
        <Flex flexDirection="column" gridGap={5}>
          <Box flex="1">
            <FormLabel htmlFor="Address Line">Address Line</FormLabel>
            <CustomField
              id="address"
              type="text"
              value={address}
              onChange={(e: any) => setAddress(e.target.value)}
            />
          </Box>
          <Box flex="1">
            <FormLabel htmlFor="Pin-Code">Pincode</FormLabel>
            <CustomField id="pincode" type="text" onBlur={handlePincodeBlur} />
          </Box>
          <Box flex="1" height="4%">
            <FormLabel htmlFor="Country">Country</FormLabel>
            {loading ? (
              <Spinner />
            ) : (
              <CustomField id="country" type="text" value={country} />
            )}
          </Box>
          <Box flex="1">
            <FormLabel htmlFor="State">State</FormLabel>

            {loading ? (
              <Spinner />
            ) : (
              <CustomField id="state" type="text" value={state} />
            )}
          </Box>
          <Box flex="1">
            <FormLabel htmlFor="City">City</FormLabel>

            {loading ? (
              <Spinner />
            ) : (
              <CustomField id="city" type="text" value={city} />
            )}
          </Box>
          <Button variant="primarySolid" marginTop="3%">
            Submit
          </Button>
        </Flex>
      </FormControl>
    </Container>
  );
};

export default Shipping;
