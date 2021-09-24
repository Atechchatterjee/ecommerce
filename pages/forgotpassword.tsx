import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { Center, Container, Stack, Heading, Box } from "@chakra-ui/layout";
import Banner from "../components/Banner";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { CustomField } from "../components/CustomField";
import { Button } from "@chakra-ui/button";
import axios from "axios";
import constants from "../util/Constants";
import { useCookies } from "react-cookie";

interface Email {
  subject: string;
  body: string;
  code: string;
  toEmail: string;
}

const SendVerficationEmail: React.FC<{
  emailSent?: (sent: boolean) => void;
}> = ({ emailSent }) => {
  const [email, setEmail] = useState<string>("");
  const [cookies] = useCookies(["token"]);

  const getCode = (): number =>
    Math.floor(100000000 + Math.random() * 900000000);

  const sendEmail = async (emailBody: Email): Promise<void> => {
    try {
      const res = await axios.post(`${constants.url}/auth/sendemail/`, {
        emailBody,
      });
      if (emailSent) emailSent(true);
      return Promise.resolve();
    } catch (err) {
      alert("You have signed in through google");
      if (emailSent) emailSent(false);
      return Promise.reject(err);
    }
  };

  return (
    <AccordionPanel pb={4}>
      <div
        style={{
          marginTop: "1.2em",
          width: "25em",
          marginLeft: "1em",
          marginBottom: "2em",
        }}
      >
        <CustomField
          name="email"
          label="email"
          placeholder="email address"
          onChange={(event: any) => setEmail(event.target.value)}
        />
        <Button
          colorScheme="teal"
          marginLeft="20em"
          marginTop="1em"
          borderRadius="none"
          onClick={() => {
            const code: string = getCode().toString();
            sendEmail({
              subject: "Reset Password",
              code: code,
              body: `To reset the password use the code given below ${code}`,
              toEmail: email,
            }).catch((err) => console.error(err));
          }}
        >
          Submit
        </Button>
      </div>
    </AccordionPanel>
  );
};

// GetVerificationCode -> GVC
const GetVerificationCode: React.FC<{ gotCode?: (got: boolean) => void }> = ({
  gotCode,
}) => {
  const [verificationCode, setVerificationCode] = useState<string>("");

  const verifyCode = async () => {
    axios
      .post(
        `${constants.url}/auth/verifycode/`,
        { code: verificationCode },
        {
          headers: {
            Cookie: document.cookie,
          },
        }
      )
      .then(() => {
        if (gotCode) gotCode(true);
      })
      .catch(() => {
        if (gotCode) gotCode(false);
      });
  };

  return (
    <AccordionPanel pb={4}>
      <div
        style={{
          marginTop: "1.2em",
          width: "25em",
          marginLeft: "1em",
          marginBottom: "2em",
        }}
      >
        <CustomField
          name="verificationCode"
          label="Verification Code"
          placeholder="Verification Code"
          onChange={(event: any) => setVerificationCode(event.target.value)}
        />
        <Button
          colorScheme="teal"
          marginLeft="20em"
          marginTop="1em"
          borderRadius="none"
          onClick={() => {
            verifyCode();
          }}
        >
          Submit
        </Button>
      </div>
    </AccordionPanel>
  );
};

const ResetPasswordScreen = () => {
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  const changePass = () => {
    if (newPass) {
      axios
        .post(`${constants.url}/auth/resetPass/`, {
          newPass,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("The two passwords do not match");
    }
  };

  return (
    <AccordionPanel pb={4}>
      <div
        style={{
          marginTop: "1.2em",
          width: "25em",
          marginLeft: "1em",
          marginBottom: "1em",
        }}
      >
        <CustomField
          name="confirmPass"
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          onChange={(event: any) => setConfirmPass(event.target.value)}
        />
        <br />
        <CustomField
          name="newPass"
          label="New Password"
          type="password"
          placeholder="New Password"
          onChange={(event: any) => {
            if (confirmPass == event.target.value) {
              setNewPass(event.target.value);
            }
          }}
        />
        <Button
          colorScheme="teal"
          marginLeft="20em"
          marginTop="1em"
          borderRadius="none"
          onClick={changePass}
        >
          Submit
        </Button>
      </div>
    </AccordionPanel>
  );
};

const SendVerificationOTP: React.FC = () => {
  return (
    <AccordionPanel pb={4}>
      <div
        style={{
          marginTop: "1.2em",
          width: "25em",
          marginLeft: "1em",
          marginBottom: "2em",
          border: "none",
        }}
      >
        <CustomField
          name="phNumber"
          label="phone number"
          placeholder="phone number"
        />
        <Button
          colorScheme="teal"
          marginLeft="20em"
          marginTop="1em"
          borderRadius="none"
        >
          Get OTP
        </Button>
      </div>
    </AccordionPanel>
  );
};

const ForgotPassword: NextPage = () => {
  const [showScreen, setShowScreen] = useState<number | null>(1);

  useEffect(() => {
    const screenNo = localStorage.getItem("screenNo");
    if (screenNo) {
      setShowScreen(parseInt(screenNo));
    } else {
      setShowScreen(1);
    }
  }, [showScreen, setShowScreen]);

  return (
    <>
      <Banner text="My Account" />
      <Container
        style={{
          boxShadow: "0.2em 0.2em 0.2em 0.2em #e1e1e1",
          height: "33em",
        }}
      >
        <Center color="gray" style={{ marginTop: "7vh" }}>
          <Stack
            direction={["row", "column"]}
            spacing="35px"
            style={{ width: "25em", marginTop: "3em" }}
          >
            <Center>
              <Heading size="lg">Forgot Password</Heading>
            </Center>
          </Stack>
        </Center>

        <Accordion allowToggle marginTop="2em" padding="1em">
          <AccordionItem>
            <h2>
              <AccordionButton
                backgroundColor="#F2F2F2"
                borderTopWidth="0"
                borderBottomWidth="0"
              >
                <Box flex="1" textAlign="left">
                  Reset Your Password
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            {(() => {
              switch (showScreen) {
                case 1:
                  return (
                    <SendVerficationEmail
                      emailSent={(sent) => {
                        if (sent) {
                          localStorage.setItem("screenNo", "2");
                          setShowScreen(2);
                        }
                      }}
                    />
                  );
                case 2:
                  return (
                    <GetVerificationCode
                      gotCode={(code) => {
                        if (code) {
                          localStorage.setItem("screenNo", "3");
                          setShowScreen(3);
                        } else {
                          alert("wrong verification code");
                        }
                      }}
                    />
                  );
                case 3:
                  return <ResetPasswordScreen />;
                default:
                  break;
              }
            })()}
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton
                backgroundColor="#F2F2F2"
                borderTopWidth="0"
                borderBottomWidth="0"
              >
                <Box flex="1" textAlign="left">
                  Login via OTP
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <SendVerificationOTP />
          </AccordionItem>
        </Accordion>
      </Container>
    </>
  );
};

export default ForgotPassword;
