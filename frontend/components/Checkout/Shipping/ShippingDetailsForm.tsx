import {
  Button,
  Flex,
  Box,
  FormControl,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CustomField } from "../../Custom/CustomField";
import { useReducer, useState, useEffect } from "react";
import {
  createShippingQuery,
  getShippingDetails,
} from "../../../services/ShippingService";
import axios from "axios";
import { useQuery } from "react-query";

const getDataFromPincode = (pincode: string): Promise<any> =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((res) => resolve(res.data[0].PostOffice[0]))
      .catch((err) => reject(err));
  });

const initialFormState = {
  address: "",
  country: "",
  city: "",
  state: "",
  pincode: "",
};

const formReducer = (formState: any, action: any) => {
  switch (action.type) {
    case "address":
      return { ...formState, address: action.payload };
    case "pincode":
      return { ...formState, pincode: action.payload };
    case "set-location":
      return { ...formState, ...action.payload };
    case "reset":
      return initialFormState;
    default:
      return formState;
  }
};

const ShippingDetailsForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [prevPincode, setPrevPincode] = useState<string>("");
  const toast = useToast();
  const FORM_BORDER_COLOR = "gray.300";

  const { data: shippingDetails } = useQuery(
    "shipping_details",
    getShippingDetails
  );

  const createInitialFormState = () => {
    if (shippingDetails) {
      return {
        address: shippingDetails.address,
        country: shippingDetails.country,
        city: shippingDetails.city,
        state: shippingDetails.state,
        pincode: shippingDetails.pincode,
      };
    } else return initialFormState;
  };

  const [formState, dispatchFormState] = useReducer(
    formReducer,
    createInitialFormState()
  );

  const submitForm = () => {
    try {
      createShippingQuery(formState);
      toast({
        title: "Query successfully generated.",
        description:
          "We have generated a shipping query with all your details.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Sorry for the inconvenience!",
        description: "We could not generate a shipping query.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    dispatchFormState({ type: "reset" });
  };

  const handlePincodeBlur = (e: any) => {
    const currentPincode: string = e.target.value;
    if (currentPincode.trim() === "" || currentPincode.trim() === prevPincode)
      return;
    setLoading(true);
    getDataFromPincode(currentPincode)
      .then((data) => {
        const { Region: city, State: state, Country: country } = data;
        dispatchFormState({
          type: "set-location",
          payload: { city, state, country },
        });
        setPrevPincode(currentPincode);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <FormControl width="50%" flex="1" padding="2% 5%" onSubmit={submitForm}>
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
            value={formState.address}
            borderColor={FORM_BORDER_COLOR}
            onChange={(e: any) =>
              dispatchFormState({ type: "address", payload: e.target.value })
            }
          />
        </Box>
        <Box flex="1">
          <CustomField
            label="pincode"
            id="pincode"
            type="text"
            value={formState.pincode}
            onChange={(e: any) =>
              dispatchFormState({ type: "pincode", payload: e.target.value })
            }
            onBlur={handlePincodeBlur}
            borderColor={FORM_BORDER_COLOR}
          />
        </Box>
        <Box flex="1" height="4%">
          <CustomField
            label="country"
            id="country"
            type="text"
            value={formState.country}
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
              value={formState.state}
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
              value={formState.city}
              borderColor={FORM_BORDER_COLOR}
              isDisabled
              isLoading={loading}
            />
          </Box>
        </Flex>
        <Box textAlign="right" flex="1">
          <Button variant="primarySolid" mt="3%" w="5rem" onClick={submitForm}>
            save
          </Button>
        </Box>
      </Flex>
    </FormControl>
  );
};

export default ShippingDetailsForm;
