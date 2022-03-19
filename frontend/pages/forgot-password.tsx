import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { Center, Stack, Heading, Box } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { CustomField } from "../components/Custom/CustomField";
import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/react";
import { getCode } from "../util/GetCode";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import axios from "axios";
import constants from "../util/Constants";
import CustomContainer from "../components/Custom/CustomContainer";

interface Email {
  subject: string;
  body: string;
  code: string;
  toEmail: string;
}

const CustomSpinner = ({ ...props }) => {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
      {...props}
    />
  );
};

const AccordianButtonStyle = {
  color: "white",
  backgroundColor: "primary.200",
  _hover: {
    backgroundColor: "primary.800",
  },
  _focus: {
    outline: "none",
  },
  borderTopWidth: "0",
  borderBottomWidth: "0",
};

const ForgotPassword: NextPage = () => {
  const [resetPassScreen, setResetPassScreen] = useState<number | null>(1);
  const [loginOTPScreen, setLoginOTPScreen] = useState<number | null>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const screenNo = localStorage.getItem("screenNo");
    const OTPScreenNo = localStorage.getItem("OTPScreenNo");

    if (screenNo) {
      setResetPassScreen(parseInt(screenNo));
    } else {
      localStorage.setItem("screenNo", "1");
      setResetPassScreen(1);
    }

    if (OTPScreenNo) {
      setLoginOTPScreen(parseInt(OTPScreenNo));
    } else {
      localStorage.setItem("OTPScreenNo", "1");
      setLoginOTPScreen(1);
    }
  }, [resetPassScreen, setResetPassScreen, loginOTPScreen, setLoginOTPScreen]);

  const SendVerficationEmail: React.FC<{
    emailSent?: (sent: boolean) => void;
  }> = ({ emailSent }) => {
    const [email, setEmail] = useState<string>("");

    const sendEmail = async (emailBody: Email): Promise<void> => {
      try {
        setLoading(true);
        await axios.post(`${constants.url}/auth/sendemail/`, {
          emailBody,
        });

        if (emailSent) emailSent(true);
        setLoading(false);

        return Promise.resolve();
      } catch (err) {
        setLoading(false);
        console.error(err);
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
            width: "32em",
            marginLeft: "1em",
            marginBottom: "2em",
          }}
        >
          {!loading ? (
            <>
              <CustomField
                name="email"
                label="email"
                placeholder="email address"
                width="full"
                onChange={(event: any) => setEmail(event.target.value)}
              />
              <Button
                variant="secondarySolid"
                marginLeft="26.2em"
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
            </>
          ) : (
            <Center>
              <CustomSpinner />
            </Center>
          )}
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
      setLoading(true);
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
          setLoading(false);
          if (gotCode) gotCode(true);
        })
        .catch(() => {
          setLoading(false);
          if (gotCode) gotCode(false);
        });
    };

    return (
      <AccordionPanel pb={4}>
        <div
          style={{
            marginTop: "1.2em",
            width: "32em",
            marginLeft: "1em",
            marginBottom: "2em",
          }}
        >
          {!loading ? (
            <>
              <CustomField
                name="verificationCode"
                label="Verification Code"
                placeholder="Verification Code"
                onChange={(event: any) =>
                  setVerificationCode(event.target.value)
                }
              />
              <Button
                variant="secondarySolid"
                marginLeft="26.2em"
                marginTop="1em"
                borderRadius="none"
                onClick={() => {
                  verifyCode();
                }}
              >
                Submit
              </Button>
            </>
          ) : (
            <Center>
              <CustomSpinner />
            </Center>
          )}
        </div>
      </AccordionPanel>
    );
  };

  const ResetPasswordScreen: React.FC<{ done?: (dn: boolean) => void }> = ({
    done,
  }) => {
    const [newPass, setNewPass] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");

    const changePass = () => {
      if (newPass) {
        setLoading(true);
        axios
          .post(`${constants.url}/auth/resetPass/`, {
            newPass,
          })
          .then((res) => {
            setLoading(false);
            if (done) done(true);
          })
          .catch((err) => {
            setLoading(false);
            if (done) done(false);
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
            width: "32em",
            marginLeft: "1em",
            marginBottom: "1em",
          }}
        >
          {!loading ? (
            <>
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
                variant="secondarySolid"
                marginLeft="26.2em"
                marginTop="1em"
                borderRadius="none"
                onClick={changePass}
              >
                Submit
              </Button>
            </>
          ) : (
            <Center>
              <CustomSpinner />
            </Center>
          )}
        </div>
      </AccordionPanel>
    );
  };

  const SendVerificationOTP: React.FC<{
    sentOTP?: (sent: boolean) => void;
  }> = ({ sentOTP }) => {
    const [phNumber, setPhNumber] = useState<string>("");

    return (
      <AccordionPanel pb={4}>
        <div
          style={{
            marginTop: "1.2em",
            width: "32em",
            marginLeft: "1em",
            marginBottom: "2em",
            border: "none",
          }}
        >
          <CustomField
            name="phNumber"
            label="phone number"
            placeholder="phone number"
            onChange={(event: any) => setPhNumber(event.target.value)}
          />
          <Button
            variant="secondarySolid"
            marginLeft="25.8em"
            marginTop="1em"
            borderRadius="none"
            onClick={() => {
              axios
                .post(`${constants.url}/auth/sendOTP/`, {
                  OTP: getCode().toString(),
                  phNumber: phNumber,
                })
                .then((res) => {
                  if (sentOTP) sentOTP(true);
                  console.log(res);
                })
                .catch((err) => {
                  if (sentOTP) sentOTP(false);
                  console.log(err);
                });
            }}
          >
            Get OTP
          </Button>
        </div>
      </AccordionPanel>
    );
  };

  const Verify_OTP: React.FC<{ verifiedOTP?: (verified: boolean) => void }> = ({
    verifiedOTP,
  }) => {
    const [OTP, setOTP] = useState<string>("");

    return (
      <AccordionPanel pb={4}>
        <div
          style={{
            marginTop: "1.2em",
            width: "32em",
            marginLeft: "1em",
            marginBottom: "2em",
            border: "none",
          }}
        >
          <CustomField
            name="OTP"
            label="Enter OTP"
            placeholder="Enter OTP"
            onChange={(event: any) => {
              setOTP(event.target.value);
            }}
          />
          <Button
            colorScheme="teal"
            variant="secondarySolid"
            marginLeft="24.8em"
            marginTop="1em"
            borderRadius="none"
            onClick={() => {
              axios
                .post(`${constants.url}/auth/verifyOTP/`, {
                  OTP,
                })
                .then((res) => {
                  if (verifiedOTP) verifiedOTP(true);
                  console.log(res);
                  window.location.assign("/shop");
                })
                .catch((err) => {
                  if (verifiedOTP) verifiedOTP(false);
                  console.log(err);
                });
            }}
          >
            Verify OTP
          </Button>
        </div>
      </AccordionPanel>
    );
  };

  return (
    <>
      <Header />
      <CustomContainer height="33em">
        <Center color="gray" style={{ marginTop: "7vh" }}>
          <Stack
            direction={["row", "column"]}
            spacing="35px"
            style={{ width: "25em", marginTop: "3em" }}
          >
            <Center>
              <Heading size="lg" fontFamily="Sora" color="gray.600">
                Forgot Password
              </Heading>
            </Center>
          </Stack>
        </Center>

        <Accordion marginTop="2em" padding="1em" defaultIndex={[0]}>
          <AccordionItem>
            <h2>
              <AccordionButton {...AccordianButtonStyle}>
                <Box flex="1" textAlign="left">
                  Reset Your Password
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            {(() => {
              switch (resetPassScreen) {
                case 1:
                  return (
                    <SendVerficationEmail
                      emailSent={(sent) => {
                        if (sent) {
                          localStorage.setItem("screenNo", "2");
                          setResetPassScreen(2);
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
                          setResetPassScreen(3);
                        } else {
                          alert("wrong verification code");
                        }
                      }}
                    />
                  );
                case 3:
                  return (
                    <ResetPasswordScreen
                      done={(dn) => {
                        if (dn) {
                          localStorage.setItem("screenNo", "1");
                          setResetPassScreen(1);
                        }
                      }}
                    />
                  );
                default:
                  break;
              }
            })()}
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton {...AccordianButtonStyle}>
                <Box flex="1" textAlign="left">
                  Login via OTP
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            {(() => {
              switch (loginOTPScreen) {
                case 1:
                  return (
                    <SendVerificationOTP
                      sentOTP={(sent) => {
                        if (sent) {
                          localStorage.setItem("OTPScreenNo", "2");
                          setLoginOTPScreen(2);
                        }
                      }}
                    />
                  );
                case 2:
                  return (
                    <Verify_OTP
                      verifiedOTP={(verified) => {
                        if (verified) {
                          localStorage.setItem("OTPScreenNo", "1");
                          setLoginOTPScreen(1);
                        } else alert("invalid OTP");
                      }}
                    />
                  );
                default:
                  break;
              }
            })()}
          </AccordionItem>
        </Accordion>
      </CustomContainer>
      <Footer />
    </>
  );
};

export default ForgotPassword;
