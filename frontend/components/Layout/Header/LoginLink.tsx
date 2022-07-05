import { Text, Link, LinkProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../../../util/Authenticated";
import logout from "../../../util/Logout";

const LoginLink = ({ ...props }: LinkProps) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    isAuthenticated()
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false));
  }, []);

  if (!authenticated) {
    return (
      <Link
        href="/login"
        fontFamily="Nunito"
        textUnderlineOffset="0.1em"
        display="flex"
        flexDirection="row"
        justifyContent="right"
        gridGap="2"
        _hover={{
          fontWeight: "bold",
        }}
        _focus={{
          outline: "none",
        }}
        marginTop="0.2em"
        transition="all ease-in-out 0.1s"
        {...props}
      >
        Sign In <Text fontStyle="italic">/</Text> Sign up
      </Link>
    );
  } else {
    return (
      <Link
        onClick={() => logout()}
        fontFamily="Nunito"
        textUnderlineOffset="0.2em"
        {...props}
      >
        logout
      </Link>
    );
  }
};

export default LoginLink;
