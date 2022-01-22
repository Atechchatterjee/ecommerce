import React, { useRef, useState } from "react";
import { Button, Center, Stack, Container } from "@chakra-ui/react";
import { Formik } from "formik";
import { NextPage } from "next";
import { CustomField } from "../../components/Custom/CustomField";
import constants from "../../util/Constants";
import axios from "axios";
import Banner from "../../components/Layout/Banner";

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
      <Container
        style={{
          boxShadow: "0.2em 0.2em 0.2em 0.2em #e1e1e1",
          height: "23em",
        }}
        borderRadius="lg"
      >
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
                    <div style={{ marginTop: "1em" }}>
                      <CustomField
                        placeholder="Admin Email"
                        name="email"
                        label="Admin Email Id"
                        borderRadius="md"
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
                        borderRadius="md"
                        isInvalid={err}
                      />
                      <br />
                      <Button
                        marginTop="1em"
                        type="submit"
                        variant="blueSolid"
                        width="100%"
                        borderRadius="lg"
                      >
                        Submit
                      </Button>
                      <br />
                    </div>
                  </form>
                );
              }}
            </Formik>
          </Stack>
        </Center>
      </Container>
    </div>
  );
};

export default AdminLogin;
