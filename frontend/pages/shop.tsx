import type { NextPage } from "next";
import WithAuth from "../util/WithAuth";

const Shop: NextPage = () => {
  return <h1>Shop</h1>;
};

export default WithAuth(Shop);
