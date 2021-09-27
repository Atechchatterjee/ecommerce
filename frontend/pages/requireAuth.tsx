import type { NextPage, NextPageContext } from "next";
import React from "react";
import axios from "axios";
import constants from "../util/Constants";
import Redirect from "../util/Redirect";

export const getAuthToken = async (ctx: NextPageContext): Promise<string> => {
  if (ctx.req) {
    try {
      const res = await axios.get(`${constants.url}/auth/isAuthenticated/`, {
        withCredentials: true,
        headers: {
          Cookie: ctx.req.headers.cookie,
        },
      });

      const token = res.data.token;

      if (token != null) {
        return Promise.resolve(token);
      } else {
        if (ctx.res) {
          return Promise.reject();
        }
      }
    } catch (err) {
      return Promise.reject();
    }
  }
  return Promise.reject();
};

// authenticating a page in next js
export const requireAuth = (Page: NextPage) => {
  return class AuthComponent extends React.Component {
    static async getInitialProps(ctx: NextPageContext) {
      try {
        const token = await getAuthToken(ctx);
        return {
          token: token,
        };
      } catch (err) {
        Redirect(ctx, "/login");
      }
      return {};
    }

    render() {
      return <Page {...this.props} />;
    }
  };
};
