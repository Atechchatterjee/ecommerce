import React, { useState, useRef } from "react";
import { Formik } from "formik";
import axios from "axios";
import { ShowError } from "../Custom/ShowError";
import { CustomField } from "../Custom/CustomField";
import { Button, Box, Flex, Link, Text } from "@chakra-ui/react";
import constants from "../../util/Constants";
import GoogleAuth from "./GoogleAuth";

const SignIn: React.FunctionComponent = () => {
  const [failedError, setFailedError] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);
  const formikRef = useRef<any>();

  return (
    <>
      <Box className="SignUp-Wrapper">
        <Formik
          innerRef={formikRef}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(formData, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            axios.defaults.withCredentials = true;
            axios
              .post(`${constants.url}/auth/signin/`, formData)
              .then((res) => {
                console.log(res);
                setSubmitting(false);
                setFailedError("");
                setErr(false);
                document.location.assign("/shop");
              })
              .catch((err) => {
                setFailedError("Email or Password is incorrect");
                setErr(true);
                console.error(err);
              });
          }}
        >
          {({ handleSubmit, handleChange }) => {
            return (
              <form onSubmit={handleSubmit}>
                <ShowError
                  condition={failedError.length > 0}
                  error={failedError}
                />
                <Flex
                  marginTop="1em"
                  flexDirection="column"
                  gridGap="4"
                  width="100%"
                >
                  <CustomField
                    placeholder="Email Address"
                    name="email"
                    label="Email Id"
                    onChange={handleChange}
                    isInvalid={err}
                    width="100%"
                    flex="1"
                  />
                  <CustomField
                    placeholder="Password"
                    name="password"
                    type="password"
                    label="Password"
                    onChange={handleChange}
                    isInvalid={err}
                    width="100%"
                    flex="1"
                  />
                  <Link
                    color="red.400"
                    fontSize="0.8em"
                    onClick={() => window.location.assign("/forgotpassword")}
                    textAlign="right"
                    flex="1"
                  >
                    Forgot Password ?
                  </Link>
                  <Button
                    type="submit"
                    variant="primarySolid"
                    width="100%"
                    borderRadius="none"
                  >
                    Submit
                  </Button>
                  <Box className="social-media-login" flex="1">
                    <Text fontSize="sm">OR</Text>
                    <GoogleAuth />
                  </Box>
                </Flex>
              </form>
            );
          }}
        </Formik>
      </Box>
    </>
  );
};

export default SignIn;
