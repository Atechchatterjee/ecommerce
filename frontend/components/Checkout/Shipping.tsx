import React, { useState } from "react";
import {
  Box,
  Button,
  ContainerProps,
  Flex,
  FormControl,
  FormLabel,
  Spinner,
} from "@chakra-ui/react";
import { CustomField } from "../Custom/CustomField";
import axios from "axios";
import { rejects } from "assert";

const getDataFromPincode = (pincode: string): Promise<any> =>
  new Promise((resolve) => {
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

const Shipping = ({ ...props }: ContainerProps) => {
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>("");
  const FORM_BORDER_COLOR = "gray.400";

  const handlePincodeBlur = (e: any) => {
    const currentPincode: string = e.target.value;
    if (currentPincode.trim() === ("" || pincode)) return;
    setPincode(currentPincode);
    setLoading(true);
    getDataFromPincode(currentPincode)
      .then((data) => {
        console.log({ data });
        setCity(data.Region);
        setState(data.State);
        setCountry(data.Country);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <Box display="flex" justifyContent="center">
      <FormControl width="50%" marginTop="5%">
        <Flex flexDirection="column" gridGap={5}>
          <Box flex="1">
            <FormLabel htmlFor="Address Line">Address Line</FormLabel>
            <CustomField
              id="address"
              type="text"
              value={address}
              borderColor={FORM_BORDER_COLOR}
              onChange={(e: any) => setAddress(e.target.value)}
            />
          </Box>
          <Box flex="1">
            <FormLabel htmlFor="Pin-Code">Pincode</FormLabel>
            <CustomField
              id="pincode"
              type="text"
              onBlur={handlePincodeBlur}
              borderColor={FORM_BORDER_COLOR}
            />
          </Box>
          <Box flex="1" height="4%">
            <FormLabel htmlFor="Country">Country</FormLabel>
            {loading ? (
              <Spinner />
            ) : (
              <CustomField
                id="country"
                type="text"
                value={country}
                borderColor={FORM_BORDER_COLOR}
              />
            )}
          </Box>
          <Box flex="1">
            <FormLabel htmlFor="State">State</FormLabel>

            {loading ? (
              <Spinner />
            ) : (
              <CustomField
                id="state"
                type="text"
                value={state}
                borderColor={FORM_BORDER_COLOR}
              />
            )}
          </Box>
          <Box flex="1">
            <FormLabel htmlFor="City">City</FormLabel>

            {loading ? (
              <Spinner />
            ) : (
              <CustomField
                id="city"
                type="text"
                value={city}
                borderColor={FORM_BORDER_COLOR}
              />
            )}
          </Box>
          <Button variant="primarySolid" marginTop="5%">
            Submit
          </Button>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default Shipping;
