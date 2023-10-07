import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="w-100 hero-section ">
      <div className="intro">
        <span style={{ fontSize: "4rem", fontWeight: "800" }}>
          Find Your Games Now
        </span>
        <p style={{ fontSize: "2rem", fontWeight: "800" }}>
          Limited edition offer
        </p>
        <Link to="/cart">
          <div
            style={{ padding: "1rem", fontSize: "2rem", fontWeight: "800" }}
            className="rounded"
          >
            Products
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
