import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getCatItemById } from "../../components/categories/categoryAction";
import img from "../../assets/mastercard.png";
import { BiSolidCartAdd } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../components/cartComponent/cartSlice";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Alert, Stack } from "@mui/material";
const LandingPage = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartStore);
  const [error, setError] = useState(false);
  const [item, setItem] = useState({});
  const [currentImage, setCurrentImage] = useState("");
  const getItemById = async () => {
    const data = await getCatItemById(_id);
    if (data) {
      setItem(data);
    }
    if (data?.thumbnail) {
      setCurrentImage(data?.thumbnail);
    }
  };

  const addCart = () => {
    const { name, price, thumbnail, _id, qty } = item;
    const filter = cart?.find((item) => item._id === _id);
    if (!filter?._id) {
      dispatch(
        setCart({
          name,
          price,
          thumbnail,
          _id,
          totalPrice: price,
          qty: 1,
          numAvailable: qty,
        })
      );
    } else {
      console.log("item has been on the cart");
      setError(true);
    }
  };
  useEffect(() => {
    getItemById();
  }, [_id]);
  return (
    <div
      className="w-100"
      style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}
    >
      <Header />
      <div className="w-100 gallery container">
        <div className="w-50 h-100 images-container">
          <img src={process.env.REACT_APP_CMS + currentImage?.slice(10)} />
          <div className="w-100 d-flex  mt-4 images-collection">
            {item?.images?.length > 0 &&
              item?.images?.map((data, i) => (
                <div
                  style={{
                    width: "100px",
                    objectFit: "cover",
                  }}
                  className="images-branches"
                  key={i}
                >
                  <img
                    className="w-100 h-100"
                    src={process.env.REACT_APP_CMS + data.slice(10)}
                    onClick={() => setCurrentImage(data)}
                  />
                </div>
              ))}
            <div className="left-arrow">
              <AiOutlineLeft />
            </div>
            <div className="left-right">
              <AiOutlineRight />
            </div>
          </div>
        </div>
        <div className="w-50 item-landing-desc">
          <p>{item?.name}</p>
          <div className="rounded text-center">${item?.salesPrice}</div>
          <div className="payment-options">
            <span>Payment Options</span>

            <img src={img} className="border " />
          </div>

          <Button variant="dark" onClick={addCart}>
            Add Cart <BiSolidCartAdd />
          </Button>
          {error && (
            <Stack sx={{ width: "100%" }}>
              <Alert severity="error">Item has been on the cart</Alert>
            </Stack>
          )}
        </div>
      </div>
      <div className="container mt-5">
        <p>
          <b>Description</b>
        </p>
        <p>{item?.description}</p>
      </div>
    </div>
  );
};

export default LandingPage;
