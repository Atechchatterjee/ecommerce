import React, { useState, useRef } from "react";
import { Formik } from "formik";
import axios from "axios";
import { ShowError } from "./Custom/ShowError";
import { CustomField } from "./Custom/CustomField";
import "../styles/signup.module.css";
import { Button, Link, Text } from "@chakra-ui/react";
import constants from "../util/Constants";
import GoogleAuth from "./GoogleAuth";

const SignIn: React.FunctionComponent = () => {
  // failedErr: user already exists
  const [failedError, setFailedError] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);
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
                <div style={{ marginTop: "1em" }}>
                  <CustomField
                    placeholder="Email Address"
                    name="email"
                    label="Email Id"
                    onChange={handleChange}
                    isInvalid={err}
                  />
                  <br />
                  <CustomField
                    placeholder="Password"
                    name="password"
                    type="password"
                    label="Password"
                    onChange={handleChange}
                    isInvalid={err}
                  />
                  <br />
                  <Link
                    color="red.400"
                    fontSize="0.8em"
                    marginLeft="19em"
                    onClick={() => window.location.assign("/forgotpassword")}
                  >
                    Forgot Password ?
                  </Link>
                  <br />
                  <Button
                    type="submit"
                    variant="blueSolid"
                    marginTop="1em"
                    width="100%"
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
