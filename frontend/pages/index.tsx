import type { NextPage } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const slideImages = [
  "images/slide_1.jpg",
  "images/slide_2.jpg",
  "images/slide_3.jpg",
];

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[0]})` }}>
            <span>Slide 1</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[1]})` }}>
            <span>Slide 2</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[2]})` }}>
            <span>Slide 3</span>
          </div>
        </div>
      </Slide>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div>
      <h1>Heading</h1>
    </div>
  );
};

export default Home;
