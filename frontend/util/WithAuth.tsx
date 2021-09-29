import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { isAuthenticated } from "./Authenticated";

export default (WrappedComponent: NextPage) => {
  return ({ ...props }) => {
    const [authenticated, setAuthenticated] = useState<number>(-1);
    const Router = useRouter();
    const serverSide = typeof window === "undefined";

    useEffect(() => {
      isAuthenticated(document.cookie)
        .then(() => {
          setAuthenticated(1);
        })
        .catch((err) => {
          console.error(err);
          setAuthenticated(0);
        });
    }, []);

    if (!serverSide) {
      if (authenticated === 1) {
        return <WrappedComponent {...props} />;
      } else if (authenticated === 0) {
        Router.push("/login");
        return <></>;
      } else {
        return <></>;
      }
    } else {
      console.warn("you are in the server side");
      return <></>;
    }
  };
};
