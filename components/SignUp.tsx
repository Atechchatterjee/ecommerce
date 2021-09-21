import React, { useState, useRef } from "react";
import { Formik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { ShowError } from "./ShowError";
import { CustomField } from "./CustomField";
import "../styles/signup.module.css";
import { Button } from "@chakra-ui/react";
import constants from "../util/Constants";

// validation with yup
const emailValidation: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phNumberValidation: RegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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
        {({ handleSubmit, errors, handleChange }) => {
          return (
            <>
              <form onSubmit={handleSubmit}>
                <ShowError condition={failedErr.length > 0} error={failedErr} />
                <div style={{ marginTop: "1em" }}>
                  <CustomField
                    placeholder="Email Address"
                    name="email"
                    label="Email Id"
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <br />
                  <CustomField
                    placeholder="Password"
                    name="password"
                    type="password"
                    label="Password"
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <br />
                  <CustomField
                    placeholder="Phone Number"
                    name="phNumber"
                    label="Phone Number"
                    onChange={handleChange}
                    isInvalid={!!errors.phNumber}
                  />
                  <br />
                  <Button
                    type="submit"
                    colorScheme="teal"
                    style={{ width: "100%" }}
                    borderRadius="none"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignUp;
