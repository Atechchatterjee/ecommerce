import Header from "../components/Layout/Header";
import CustomContainer from "../components/Custom/CustomContainer";
import type { NextPage } from "next";
import {
  FormControl,
  Flex,
  Text,
  Box,
  Button,
  Link,
  BoxProps,
  ContainerProps,
} from "@chakra-ui/react";
import { CustomField } from "../components/Custom/CustomField";
import { MdEmail, MdPhone, MdLocationCity, MdLocationOn } from "react-icons/md";
import color from "../theme/ColorPalatte";
import api from "../util/AxiosApi";
import { useReducer } from "react";

const { secondary } = color;

interface EmailStruct {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  queryMsg: string;
}

const AddressMap = ({ ...props }: BoxProps) => {
  return (
    <Box className="google-map-code" {...props}>
      <iframe
        src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=CND Engineering&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        width="100%"
        height="300vh"
        style={{ border: 0 }}
        aria-hidden="false"
      ></iframe>
    </Box>
  );
};

const composeEmail = async (mailContent: EmailStruct) => {
  let mailSubject = `We have a query from ${mailContent.firstName} ${mailContent.lastName}`;
  let mailBody = ` The details are as follows:
      First Name: ${mailContent.firstName}
      Last Name: ${mailContent.lastName}
      Phone: ${mailContent.phone}
      Email: ${mailContent.email}
      Query: ${mailContent.queryMsg}
    `;
  await api.post("/admin/send-email/", {
    msgSubject: mailSubject,
    msgBody: mailBody,
  });
};

const ContactForm = ({ ...props }: ContainerProps) => {
  const contactFormInitialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    queryMsg: "",
  };

  const contactFormValueReducer = (state: EmailStruct, action: any) => {
    switch (action.type) {
      case "firstName":
        return { ...state, firstName: action.payload };
      case "lastName":
        return { ...state, lastName: action.payload };
      case "email":
        return { ...state, email: action.payload };
      case "phone":
        return { ...state, phone: action.payload };
      case "queryMsg":
        return { ...state, queryMsg: action.payload };
      case "reset":
        return contactFormInitialState;
      default:
        return state;
    }
  };

  const [contactFormValue, dispatchContactFormValue] = useReducer(
    contactFormValueReducer,
    contactFormInitialState
  );

  return (
    <CustomContainer
      padding="2rem"
      borderRadius="xl"
      w="100%"
      interactive
      reverseEffect
      {...props}
    >
      <FormControl>
        <Flex flexDirection="column" gridGap={5}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="gray.600"
            mb="1rem"
            textAlign="center"
          >
            Fill out this Form
          </Text>
          <Flex flexDirection="row" gridGap={4} w="100%">
            <CustomField
              label="First Name"
              value={contactFormValue.firstName}
              onChange={(e: any) =>
                dispatchContactFormValue({
                  type: "firstName",
                  payload: e.target.value,
                })
              }
            />
            <CustomField
              label="Last Name"
              value={contactFormValue.lastName}
              onChange={(e: any) =>
                dispatchContactFormValue({
                  type: "lastName",
                  payload: e.target.value,
                })
              }
            />
          </Flex>
          <CustomField
            label="Email"
            value={contactFormValue.email}
            onChange={(e: any) =>
              dispatchContactFormValue({
                type: "email",
                payload: e.target.value,
              })
            }
          />
          <CustomField
            label="Phone Number"
            value={contactFormValue.phone}
            onChange={(e: any) =>
              dispatchContactFormValue({
                type: "phone",
                payload: e.target.value,
              })
            }
          />
          <CustomField
            label="How can we help you?"
            value={contactFormValue.queryMsg}
            as="textarea"
            h="inherit"
            minH="13rem"
            padding="0.5rem"
            onChange={(e: any) =>
              dispatchContactFormValue({
                type: "queryMsg",
                payload: e.target.value,
              })
            }
          />
        </Flex>
        <Button
          variant="primarySolid"
          mt="1rem"
          onClick={() => {
            composeEmail(contactFormValue).then(() =>
              dispatchContactFormValue({ type: "reset" })
            );
          }}
        >
          Submit
        </Button>
      </FormControl>
    </CustomContainer>
  );
};

const ContactInformation = ({ ...props }: ContainerProps) => {
  return (
    <CustomContainer
      padding="2rem"
      borderRadius="xl"
      interactive
      reverseEffect
      {...props}
    >
      <Text
        fontSize="xl"
        fontWeight="bold"
        color="gray.600"
        mb="1rem"
        textAlign="center"
      >
        Our Contact Information
      </Text>
      <Flex flexDirection="column" gridGap={0}>
        <Flex flexDirection="row" gridGap={5} mt="2rem">
          <MdEmail
            size={20}
            style={{ marginTop: "0.15rem" }}
            color={secondary[200]}
          />
          <Text fontSize="md" fontWeight="semibold" color="gray.600">
            Email Address :
          </Text>
          <Link href="mailto:info@cndengineering.com" textUnderlineOffset="2px">
            info@cndengineering.com
          </Link>
        </Flex>

        <Flex flexDirection="row" gridGap={5} mt="2rem">
          <MdPhone
            size={20}
            style={{ marginTop: "0.15rem" }}
            color={secondary[200]}
          />
          <Text fontSize="md" fontWeight="semibold" color="gray.600">
            Phone Number :
          </Text>
          <Text>80170 33385</Text>
        </Flex>
      </Flex>

      <Flex flexDirection="row" gridGap={5} mt="2rem" w="100%">
        <MdLocationCity
          size={40}
          style={{ marginTop: "-0.5rem" }}
          color={secondary[200]}
        />
        <Text fontSize="md" fontWeight="semibold" color="gray.600" w="15rem">
          Regd. Office :
        </Text>
        <Text>
          C/O- Pradipta Chattopadhyay, Pathagar Road, Ghosh Para Panihati, Near
          Ankur Club, Kolkata-700114
        </Text>
      </Flex>
      <Flex flexDirection="row" gridGap={5} mt="2rem" mb="2rem">
        <MdLocationOn size={20} color={secondary[200]} />
        <Text fontSize="md" fontWeight="semibold" color="gray.600">
          Regd. Office Location :
        </Text>
      </Flex>
      <AddressMap />
    </CustomContainer>
  );
};

const Contact: NextPage = () => {
  return (
    <Flex flexDirection="column" padding="0">
      <Header excludeCategoryBar />
      <Box mb="1rem" w="100%">
        <Flex
          justifyContent="center"
          flexDirection="row"
          mb="1rem"
          pt="6rem"
          gridGap={3}
        >
          <MdEmail
            size={30}
            color={secondary[200]}
            style={{ marginTop: "0.4rem" }}
          />
          <Text
            fontWeight="semibold"
            fontSize="3xl"
            color="gray.600"
            fontFamily="Sora"
          >
            Contact Us
          </Text>
        </Flex>
        <Text
          fontSize="sm"
          fontWeight="regular"
          color="gray.600"
          mb="1rem"
          textAlign="center"
        >
          For any queries feel free to get in touch with us.
          <br />
          Reach out to us on our email address or fill out the form.
        </Text>
      </Box>
      <Flex flexDirection="row" padding="1% 15%" flexWrap="wrap" gridGap={10}>
        <ContactForm />
        <ContactInformation />
      </Flex>
    </Flex>
  );
};

export default Contact;
