import React, { useState, useRef } from "react";
import "../../styles/signup.module.css";
import { Formik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { ShowError } from "../Custom/ShowError";
import { CustomField } from "../Custom/CustomField";
import { Box, Button, Flex } from "@chakra-ui/react";
import constants from "../../util/Constants";

// validation with yup
const emailValidation: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phNumberValidation: RegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignUp: React.FunctionComponent = () => {
  const [failedErr, setFailedErr] = useState<string>(""); // error for already existing user

  const formikRef = useRef<any>();

  const signUpValidationSchema = yup.object().shape({
    email: yup.string().matches(emailValidation, "Invalid email"),
    password: yup.string().min(8, "Too Short"),
    phNumber: yup
      .string()
      .min(10, "Invalid phone number")
      .max(10, "Invalid phone number")
      .matches(phNumberValidation, "Invalid phone number"),
  });

  return (
    <div className="SignUp-Wrapper">
      <Formik
        innerRef={formikRef}
        initialValues={{
          email: "",
          name: "",
          password: "",
          phNumber: "",
        }}
        onSubmit={(formData, { setSubmitting, resetForm }) => {
          console.log(formData);
          axios
            .post(`${constants.url}/auth/signup/`, formData)
            .then((res) => {
              console.log(res);
              document.location.reload();
            })
            .catch((err) => {
              console.error(err);
            });
        }}
        validationSchema={signUpValidationSchema}
      >
        {({ handleSubmit, errors, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <Flex flexDirection="column" gridGap="4">
              <ShowError
                condition={failedErr.length > 0}
                error={failedErr}
                flex="1"
              />
              <CustomField
                name="email"
                label="Email Id"
                onChange={handleChange}
                isInvalid={!!errors.email}
                flex="1"
              />
              <CustomField
                name="name"
                label="Name"
                onChange={handleChange}
                flex="1"
              />
              <CustomField
                name="password"
                type="password"
                label="Password"
                onChange={handleChange}
                isInvalid={!!errors.password}
                flex="1"
              />
              <CustomField
                name="phNumber"
                label="Phone Number"
                onChange={handleChange}
                isInvalid={!!errors.phNumber}
                flex="1"
              />
              <Button
                type="submit"
                variant="primarySolid"
                width="100%"
                marginTop="5%"
                borderRadius="sm"
              >
                Submit
              </Button>
            </Flex>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
