import React, { useRef, useState } from "react";
import { Button, Center, Stack, Container, Box } from "@chakra-ui/react";
import { Formik } from "formik";
import { NextPage } from "next";
import { CustomField } from "../../components/Custom/CustomField";
import constants from "../../util/Constants";
import axios from "axios";
import Banner from "../../components/Layout/Banner";
import CustomContainer from "../../components/Custom/CustomContainer";

interface FormData {
  email: string;
  password: string;
}

const AdminLogin: NextPage = () => {
  const formikRef = useRef<any>();
  const redirectURL = useRef<string>("/admin/dashboard");
  const [err, setErr] = useState<boolean>(false);

  const adminAuth = (
    setSubmitting: (submit: boolean) => void,
    formData: FormData
  ) => {
    setSubmitting(true);
    axios
      .post(`${constants.url}/auth/adminlogin/`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res.data = ", res.data);
        setSubmitting(false);
        document.location.assign(redirectURL.current);
      })
      .catch((err) => {
        setErr(true);
        console.error(err);
      });
  };

  return (
    <div>
      <Banner text="Admin Login" />
      <CustomContainer height="23em" borderRadius="sm">
        <Center color="gray" style={{ marginTop: "7vh" }}>
          <Stack
            direction={["row", "column"]}
            spacing="35px"
            style={{ width: "25em", marginTop: "3em" }}
          >
            <Formik
              innerRef={formikRef}
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(formData, { setSubmitting }) =>
                adminAuth(setSubmitting, formData)
              }
            >
              {({ handleSubmit, handleChange }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <Box marginTop="1em">
                      <CustomField
                        placeholder="Admin Email"
                        name="email"
                        label="Admin Email Id"
                        borderRadius="sm"
                        onChange={handleChange}
                        isInvalid={err}
                      />
                      <br />
                      <CustomField
                        placeholder="Admin Password"
                        name="password"
                        type="password"
                        label="Admin Password"
                        onChange={handleChange}
                        borderRadius="sm"
                        isInvalid={err}
                      />
                      <br />
                      <Button
                        marginTop="1em"
                        type="submit"
                        variant="primarySolid"
                        width="100%"
                        borderRadius="sm"
                      >
                        Submit
                      </Button>
                      <br />
                    </Box>
                  </form>
                );
              }}
            </Formik>
          </Stack>
        </Center>
      </CustomContainer>
    </div>
  );
};

export default AdminLogin;
