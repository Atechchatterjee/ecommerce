import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { isAuthenticated } from "./Authenticated";

interface AdminProp {
  admin?: boolean;
}

const WithAuth = (
  WrappedComponent: NextPage,
  { admin }: AdminProp = { admin: false }
) => {
  return ({ ...props }) => {
    const [authenticated, setAuthenticated] = useState<number>(-1);
    const Router = useRouter();

    useEffect(() => {
      isAuthenticated(document.cookie, admin)
        .then(() => {
          setAuthenticated(1);
        })
        .catch((err) => {
          console.error(err);
          console.log("admin auth failed");
          setAuthenticated(0);
        });
    }, []);

    if (authenticated === 1) {
      return <WrappedComponent {...props} />;
    } else if (authenticated === 0) {
      console.log("redirecting to login");
      if (admin) Router.push("/admin/login");
      else Router.push("/login");
      return <></>;
    } else {
      return <></>;
    }
  };
};

export default WithAuth;
