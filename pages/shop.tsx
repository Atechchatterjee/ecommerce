import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import axios from "axios";
import Router from "next/router";
import { requireAuth } from "./requireAuth";

const Shop: NextPage = ({ ...props }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div style={{ display: `${authenticated ? "block" : "none"}` }}>
      <h1>Shop</h1>
    </div>
  );
};

export default requireAuth(Shop);
