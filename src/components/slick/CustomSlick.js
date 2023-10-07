import React, { Component, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

import SlickItem from "./Slick-item";
import { Button } from "react-bootstrap";
const CustomSlick = ({ title, data }) => {
  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: null,
    nextArrow: null,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="w-100 text-light text-center custom-slick">
      <h3>{title}</h3>
      <div className="w-100 " style={{ position: "relative" }}>
        <Slider {...settings} ref={sliderRef}>
          {data?.map((item, index) => (
            <SlickItem
              key={index}
              name={item?.title || item?.name}
              imgPath={item.image || item?.thumbnail}
              id={item._id}
              slug={item.slug}
              forSlick={title}
            />
          ))}
        </Slider>
        <Button
          variant="dark"
          style={{
            position: "absolute",
            top: "50%",
            left: "0",
            transform: "translateY(-50%)",
            width: "3rem",
            height: "100%",
          }}
          className="btn-slick"
          onClick={previous}
        >
          <BiLeftArrowAlt />
        </Button>
        <Button
          variant="dark"
          style={{
            position: "absolute",
            top: "50%",
            right: "0",
            transform: "translateY(-50%)",
            width: "3rem",
            height: "100%",
          }}
          className="btn-slick"
          onClick={next}
        >
          <BiRightArrowAlt />
        </Button>
      </div>
    </div>
  );
};

export default CustomSlick;
