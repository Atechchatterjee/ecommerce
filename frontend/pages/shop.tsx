import type { NextPage } from "next";
import WithAuth from "../util/WithAuth";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const Shop: NextPage = () => {
  return (
    <>
      <Header />
      <h1>Shop</h1>
      <Footer />
    </>
  );
};

export default WithAuth(Shop);
