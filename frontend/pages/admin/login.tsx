import React, { useRef, useState } from "react";
import { Button, Center, Stack, Container, Box } from "@chakra-ui/react";
import { Formik } from "formik";
import { NextPage } from "next";
import { CustomField } from "../../components/Custom/CustomField";
import constants from "../../util/Constants";
import axios from "axios";
import Banner from "../../components/Layout/Banner";
import CustomContainer from "../../components/Custom/CustomContainer";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

interface FormData {
  email: string;
  password: string;
}

const AdminLogin: NextPage = () => {
  const formikRef = useRef<any>();
  const redirectURL = useRef<string>("/admin/catalogs/all-products");
  const [err, setErr] = useState<boolean>(false);
  const [width] = useWindowDimensions();

  const BREAK_POINTS = [850, 920];

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
      <CustomContainer
        height="22em"
        borderRadius="sm"
        w={width < BREAK_POINTS[0] ? "80vw" : "50vw"}
        mt="7vh"
      >
        <Stack
          direction={["row", "column"]}
          spacing="35px"
          padding={
            width > BREAK_POINTS[1]
              ? "2rem 5rem 4rem 5rem"
              : "2rem 3rem 2rem 3rem"
          }
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
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <Box marginTop="1em">
                    <CustomField
                      placeholder="Admin Email"
                      name="email"
                      label="Admin Email Id"
                      borderRadius="sm"
                      w="100%"
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
      </CustomContainer>
    </div>
  );
};

export default AdminLogin;
