import React, { useEffect } from "react";
import image from "../../assets/grocery-shopping.jpg";
import { Link } from "react-router-dom";
const SlickItem = ({ imgPath, name, id, slug, forSlick }) => {
  const imageStyle = {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    objectPosition: "center",
  };
  return forSlick === "Categories" ? (
    <Link to={`/category/${slug}/${id}`}>
      <div
        className="slick-item-custom"
        style={{ height: "300px", position: "relative" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img
            src={
              imgPath ? process.env.REACT_APP_CMS + imgPath?.slice(10) : image
            }
            style={imageStyle}
          />
        </div>
        <div className="item-name">
          <h2>{name}</h2>
        </div>
      </div>
    </Link>
  ) : (
    <Link to={`/landingPage/${slug}/${id}`}>
      <div
        className="slick-item-custom"
        style={{ height: "300px", position: "relative" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img
            src={
              imgPath ? process.env.REACT_APP_CMS + imgPath?.slice(10) : image
            }
            style={imageStyle}
          />
        </div>
        <div className="item-name">
          <h2>{name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default SlickItem;
