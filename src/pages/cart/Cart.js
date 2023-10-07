import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CartTable from "../../components/cartComponent/CartTable";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { setTotalprice } from "../../components/cartComponent/cartSlice";

const Cart = () => {
  const { cart } = useSelector((state) => state.cartStore);
  const dispatch = useDispatch();
  const subTotal = cart?.reduce((init, num) => {
    return init + num.totalPrice;
  }, 0);
  useEffect(() => {
    console.log(subTotal);
    dispatch(setTotalprice(subTotal + 3.55));
  }, [subTotal, dispatch]);
  return (
    <div>
      <Header />
      <h1 className="ps-4">My Cart</h1>
      <Row className="w-100">
        <Col xs={8}>
          <CartTable />
        </Col>
        <Col xs={4}>
          <Paper elevation={3} style={{ padding: "1rem" }}>
            <p style={{ fontSize: "2rem" }}>Total Summary</p>
            <hr />
            {cart?.map((item) => (
              <div className="d-flex justify-content-between">
                <span>{item.name}</span>
                <span>x {item.qty}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>${subTotal}</span>
            </div>

            {cart?.length && (
              <div className="d-flex justify-content-between">
                <span>Delivery fee</span>
                <span>3.55</span>
              </div>
            )}
            <hr />
            <div className="d-flex justify-content-between">
              <span>Total</span>
              <span>${cart?.length ? subTotal + 3.55 : subTotal}</span>
            </div>
            {cart?.length ? (
              <Link to="/checkout">
                <Button className="w-100" variant="dark">
                  Checkout
                </Button>
              </Link>
            ) : (
              <Button className="w-100" variant="dark" disabled>
                Checkout
              </Button>
            )}
          </Paper>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
