import {
  Spinner,
  Button,
  Flex,
  Box,
  FormControl,
  Text,
} from "@chakra-ui/react";
import { CustomField } from "../../Custom/CustomField";
import { useState } from "react";
import axios from "axios";

const getDataFromPincode = (pincode: string): Promise<any> =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((res) => resolve(res.data[0].PostOffice[0]))
      .catch((err) => reject(err));
  });

const ShippingDetailsForm = () => {
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>("");
  const FORM_BORDER_COLOR = "gray.300";

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
    <FormControl width="50%" flex="1" padding="2% 5%">
      <Flex flexDirection="column" gridGap={5}>
        <Text fontSize="xl" fontWeight="bold" color="gray.600">
          Fill in the Shipping Details
        </Text>
        <Box flex="1" mt="5%">
          <CustomField
            label="address"
            id="address"
            type="text"
            padding="0.5rem"
            spellCheck={false}
            as="textarea"
            h="10rem"
            value={address}
            borderColor={FORM_BORDER_COLOR}
            onChange={(e: any) => setAddress(e.target.value)}
          />
        </Box>
        <Box flex="1">
          <CustomField
            label="pincode"
            id="pincode"
            type="text"
            onBlur={handlePincodeBlur}
            borderColor={FORM_BORDER_COLOR}
          />
        </Box>
        <Box flex="1" height="4%">
          <CustomField
            label="country"
            id="country"
            type="text"
            value={country}
            borderColor={FORM_BORDER_COLOR}
            isDisabled
            isLoading={loading}
          />
        </Box>
        <Flex flexDirection="row" gridGap={4} flex="1">
          <Box flex="1">
            <CustomField
              label="state"
              id="state"
              type="text"
              value={state}
              borderColor={FORM_BORDER_COLOR}
              isLoading={loading}
              isDisabled
            />
          </Box>
          <Box flex="1">
            <CustomField
              label="city"
              id="city"
              type="text"
              value={city}
              borderColor={FORM_BORDER_COLOR}
              isDisabled
              isLoading={loading}
            />
          </Box>
        </Flex>
        <Box textAlign="right" flex="1">
          <Button variant="primarySolid" mt="3%" w="5rem">
            save
          </Button>
        </Box>
      </Flex>
    </FormControl>
  );
};

export default ShippingDetailsForm;
