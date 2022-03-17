import { Avatar } from "@chakra-ui/avatar";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useGoogleLogin } from "react-google-login";
import { GetUser } from "../../util/GetUser";
import constants from "../../util/Constants";
import { Button, ButtonProps } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/modal";
import { CustomField } from "../Custom/CustomField";
import { HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const PopUp: React.FC<{
  trigger: boolean;
  cb: (phNumber: string) => void;
}> = ({ trigger, cb }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [phNumber, setPhNumber] = useState<string>("");

  useEffect(() => {
    if (trigger) {
      onOpen();
      trigger = false;
    }
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent style={{ padding: "2em" }}>
          <ModalHeader>Please enter your phone number</ModalHeader>
          <CustomField
            placeholder="phone number"
            name="phNumber"
            value={phNumber}
            onChange={(event: any) => {
              setPhNumber(event.target.value);
            }}
          />
          <ModalCloseButton />
          <ModalFooter>
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => {
                cb(phNumber);
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const GoogleAuth = ({ ...props }: ButtonProps) => {
  const [googleAuth, setGoogleAuth] = useState<boolean>(false);
  const [userExist, setUserExist] = useState<boolean>(false);
  const googleId = useRef<string>("");
  const email = useRef<string>("");
  const name = useRef<string>("");
  const phNumber = useRef<string>("");
  const [delay, setDelay] = useState<boolean>(false);

  useEffect(() => {
    if (googleAuth && !userExist) setTimeout(() => setDelay(true), 300);
  }, [googleAuth, userExist]);

  // creates a new user or authenticates the existing user
  const authenticateUser = async () => {
    try {
      console.log({
        email: email.current,
        googleId: googleId.current,
        phNumber: phNumber.current,
        name: name.current,
      });
      await axios.post(
        `${constants.url}/auth/googlesignin/`,
        {
          email: email.current,
          googleId: googleId.current,
          phNumber: phNumber.current,
          name: name.current,
        },
        { withCredentials: true }
      );
      setGoogleAuth(false);
      setUserExist(false);
      setDelay(false);
      document.location.assign("/shop");
    } catch (err) {
      console.error(err);
    }
  };

  const successGoogleLogin = (res: any) => {
    const { profileObj } = res;
    console.log(profileObj);

    email.current = profileObj.email;
    googleId.current = profileObj.googleId;
    name.current = profileObj.name;

    setGoogleAuth(true);

    // check if the user already exists
    GetUser(email.current)
      .then(() => {
        setUserExist(true);
        // if user exist
        authenticateUser();
      })
      .catch(() => {
        setUserExist(false);
      });
  };

  const errGoogleLogin = (err: any) => {
    console.error(err);
    setGoogleAuth(false);
  };

  const { signIn } = useGoogleLogin({
    clientId: !!constants.googleClientId ? constants.googleClientId : "",
    onSuccess: successGoogleLogin,
    onFailure: errGoogleLogin,
  });

  return (
    <Button
      variant="pinkSolid"
      width="100%"
      borderRadius="none"
      boxShadow="base"
      marginTop="0.8em"
      onClick={() => signIn()}
      {...props}
    >
      <HStack>
        <Avatar src="google.svg" backgroundColor="inherit" size="xs" />
        {googleAuth && !userExist && delay ? (
          <PopUp
            trigger={true}
            cb={(ph: string) => {
              console.log(ph);
              phNumber.current = ph;
              if (phNumber.current != "") {
                authenticateUser();
              }
            }}
          />
        ) : (
          <></>
        )}
        <div style={{ marginLeft: "1em", marginTop: "0.2em" }}>
          Google Sign In
        </div>
      </HStack>
    </Button>
  );
};

export default GoogleAuth;
