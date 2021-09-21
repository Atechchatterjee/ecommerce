import React, { useState, useRef } from "react";
import { Formik } from "formik";
import axios from "axios";
import { ShowError } from "./ShowError";
import { CustomField } from "./CustomField";
import "../styles/signup.module.css";
import { Avatar, Button, HStack, Link, Text } from "@chakra-ui/react";
import constants from "../util/Constants";
import GoogleAuth from "./GoogleAuth";
import Router from "next/router";

const SignIn: React.FunctionComponent = () => {
  const [failedError, setFailedError] = useState<string>(""); // error for already existing user
  const formikRef = useRef<any>();

  return (
    <>
      <div className="SignUp-Wrapper">
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
                document.location.assign("/shop");
              })
              .catch((err) => console.error(err));
          }}
        >
          {({ handleSubmit, handleChange }) => {
            return (
              <form onSubmit={handleSubmit}>
                <ShowError
                  condition={failedError.length > 0}
                  error={failedError}
                />
                <div style={{ marginTop: "1em" }}>
                  <CustomField
                    placeholder="Email Address"
                    name="email"
                    label="Email Id"
                    onChange={handleChange}
                  />
                  <br />
                  <CustomField
                    placeholder="Password"
                    name="password"
                    type="password"
                    label="Password"
                    onChange={handleChange}
                  />
                  <br />
                  <Link
                    color="red.400"
                    href="#"
                    style={{
                      fontSize: "0.8em",
                      marginLeft: "20em",
                    }}
                    onClick={() => window.location.assign("/forgotpassword")}
                  >
                    Forgot Password ?
                  </Link>
                  <br />
                  <Button
                    type="submit"
                    colorScheme="teal"
                    style={{ width: "100%" }}
                    borderRadius="none"
                  >
                    Submit
                  </Button>
                  <br />
                  <div
                    className="social-media-login"
                    style={{
                      marginTop: "1em",
                    }}
                  >
                    <Text fontSize="sm">OR</Text>
                    <GoogleAuth />
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default SignIn;
