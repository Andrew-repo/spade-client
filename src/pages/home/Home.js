import React, { useEffect, useState } from "react";

import image from "../../assets/grocery-shopping.jpg";
import { Button, Col, Row } from "react-bootstrap";

import HomeCarousel from "../../components/HomeCarousel/Carousel";
import CustomSlick from "../../components/slick/CustomSlick";
import Header from "../../components/layout/Header";
import HeroSection from "../../components/homeComponent/HeroSection";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCatAction,
  getProductsAction,
} from "../../components/categories/categoryAction";
import { getTrendingAction } from "../../components/paymentCom/orderAction";
const Home = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.categoryCollection);
  const { products } = useSelector((state) => state.productsInfo);
  const [trending, setTrending] = useState({});
  const items = [...products]?.sort((item1, item2) => {
    const item1Param1 = new Date(item1.createdAt);
    const item1Param2 = new Date(item2.createdAt);

    return item1Param2 - item1Param1;
  });
  const getTrending = async () => {
    const data = await getTrendingAction();
    data && setTrending(data);
  };
  useEffect(() => {
    dispatch(getAllCatAction());
    dispatch(getProductsAction());
  }, [dispatch]);

  useEffect(() => {
    getTrending();
  }, []);

  return (
    <div>
      <Header />
      <HeroSection />
      <div className="option-deal w-100 py-5">
        <Row className="px-3 w-100">
          <Col md>
            <div className="option-card w-100 shadow rounded p-3">
              <h4>Trending </h4>
              <div className="w-100">
                <img
                  src={
                    process.env.REACT_APP_CMS + trending?.thumbnail?.slice(10)
                  }
                  className="w-100"
                  height={200}
                />
              </div>
              <div>
                <p>{trending?.name}</p>
                <p>${trending?.price}</p>
              </div>
            </div>
          </Col>
          <Col md>
            <div className="option-card w-100 shadow rounded p-3">
              <h4>Favourite </h4>
              <div className="w-100">
                <img
                  src={
                    process.env.REACT_APP_CMS +
                    products[0]?.thumbnail?.slice(10)
                  }
                  className="w-100"
                  height={200}
                />
              </div>
              <div>
                <p>{products[0]?.name}</p>
                <p>${products[0]?.price}</p>
              </div>
            </div>
          </Col>
          <Col md>
            <div className="option-card w-100 shadow rounded p-3 ">
              <h4>Hot </h4>
              <div className="w-100">
                <img
                  src={
                    process.env.REACT_APP_CMS +
                    products[1]?.thumbnail?.slice(10)
                  }
                  className="w-100 "
                  height={200}
                />
              </div>
              <div>
                <p>{products[1]?.name}</p>
                <p>${products[1]?.price}</p>
              </div>
            </div>
          </Col>
          <Col md>
            <div className="option-card w-100 shadow rounded p-3 ">
              <h4>New </h4>
              <div className="w-100">
                <img
                  src={
                    process.env.REACT_APP_CMS +
                    products[2]?.thumbnail?.slice(10)
                  }
                  className="w-100"
                  height={200}
                />
              </div>
              <div>
                <p>{products[2]?.name}</p>
                <p>${products[2]?.price}</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* <HomeCarousel /> */}
      <div
        className="w-100 pt-2 slick-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <CustomSlick title="Categories" data={category} />
        <CustomSlick title="New Products" data={items.slice(0, 7)} />
      </div>
      <div
        style={{
          height: "20vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: " #071b28",
          color: "white",
        }}
      >
        &copy;copyright by spade.inc
      </div>
    </div>
  );
};

export default Home;
