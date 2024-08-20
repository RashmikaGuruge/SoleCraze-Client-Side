import ArrowLeftOutlined from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlined from '@mui/icons-material/ArrowRightOutlined';
import { useState } from "react";
import  "./slider.scss";
import styled from "styled-components";
import { sliderItems } from "../../data";
import {Link} from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
        <div className="slider">
          <div className="container">
            <div className="arrow_right" onClick={() => handleClick("left")}>
              <ArrowLeftOutlined />
            </div>
            <Wrapper slideIndex={slideIndex}>
              {sliderItems.map((item) => (
                  <Slide bg={item.bg} key={item.id}>
                  <div className="imgContainer">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="infoContainer">
                    <h1>{item.title}</h1>
                    <p>{item.desc}</p>
                    <Link className="link" to="/products">
                    <button>SHOW NOW</button>
                    </Link>
                  </div>
                  </Slide>
                ))}
            </Wrapper>
            <div className="arrow_left" onClick={() => handleClick("right")}>
              <ArrowRightOutlined />
            </div>
          </div>
        </div>
 
  );
};

export default Slider;
