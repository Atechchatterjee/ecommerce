import type { NextPage } from "next";
import "react-slideshow-image/dist/styles.css";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <h1>Heading</h1>
      <Footer />
    </>
  );
};

export default Home;
