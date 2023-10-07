import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Header from "../../components/layout/Header";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  getPaymentMethodAction,
  sendPayment,
} from "../../components/paymentCom/paymentAction";
import CreditCard from "../../components/paymentCom/CreditCard";
import {
  deleteOrderAction,
  orderAction,
} from "../../components/paymentCom/orderAction";

import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import {
  emptyCart,
  resetTotalPrice,
} from "../../components/cartComponent/cartSlice";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, totalPrice } = useSelector((state) => state.cartStore);
  const [methods, setMethods] = useState([]);
  const [methodSelected, setSelectedMethod] = useState("");
  const { user } = useSelector((state) => state.userInfo);
  const [customerForm, setCustomerForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = {
    CreditCard: <CreditCard />,
  };

  const selectMethod = (e) => {
    const { value } = e.target;
    const split = value.split(" ");
    console.log(split);
    const join = split.join("");
    console.log(join);
    setSelectedMethod(join);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCustomerForm({ ...customerForm, [name]: value, totalPrice });
    console.log(customerForm);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    const data = {
      ...customerForm,
      items: cart,
      customerId: user._id,
    };
    try {
      const { status, item } = await orderAction(data);
      console.log(status, item);

      if (status === "success") {
        const client_secret = await sendPayment({
          amount: totalPrice,
          currency: "aud",
          paymentMethod: "card",
        });
        if (client_secret) {
          const { paymentIntent, error } = await stripe.confirmCardPayment(
            client_secret,
            {
              payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                  name: customerForm.fName + customerForm.lName,
                  email: customerForm.email,
                  phone: customerForm.phone,
                },
              },
            }
          );
          console.log(paymentIntent);
          if (paymentIntent && paymentIntent.status === "succeeded") {
            alert("payment succeeded");
            dispatch(emptyCart([]));
            dispatch(resetTotalPrice());
          }
          console.log(error);

          if (error) {
            console.log("stripe error");
            deleteOrderAction(item?._id);
            alert(error.message);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function getMethods() {
      const result = await getPaymentMethodAction();
      result && setMethods(result);
    }
    getMethods();
  }, []);
  useEffect(() => {
    !cart.length && navigate("/");
  }, [navigate, cart]);
  return (
    <div className="checkout-container">
      <Header />
      <Container>
        <form onSubmit={handleOnSubmit}>
          <Row>
            <Col md={8} className="bg-light p-3 checkout-form">
              <div>
                <p>Customer Detail</p>
                <Row>
                  <Row className="mt-2">
                    <Col>
                      <TextField
                        id="outlined-basic"
                        label="First Name"
                        variant="outlined"
                        className="w-100"
                        required
                        onChange={handleOnChange}
                        name="fName"
                      />
                    </Col>
                    <Col>
                      <TextField
                        id="outlined-basic"
                        label="Last Name"
                        variant="outlined"
                        className="w-100"
                        required
                        onChange={handleOnChange}
                        name="lName"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        className="w-100"
                        type="email"
                        required
                        onChange={handleOnChange}
                        name="email"
                      />
                    </Col>
                    <Col>
                      <TextField
                        id="outlined-basic"
                        label="Address"
                        variant="outlined"
                        className="w-100"
                        required
                        onChange={handleOnChange}
                        name="address"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <TextField
                        id="outlined-basic"
                        label="Phone Number"
                        variant="outlined"
                        className="w-100"
                        required
                        onChange={handleOnChange}
                        name="phone"
                      />
                    </Col>
                    <Col>
                      <TextField
                        id="outlined-basic"
                        label="Country"
                        variant="outlined"
                        className="w-100"
                        required
                        onChange={handleOnChange}
                        name="country"
                      />
                    </Col>
                  </Row>
                </Row>
              </div>
            </Col>

            <Col md={4}>
              <div className="bg-light summary-order-checkout w-100">
                <p>Summary Order</p>

                <Table className="w-100">
                  <tbody>
                    {cart?.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={
                              process.env.REACT_APP_CMS +
                              item.thumbnail?.slice(10)
                            }
                            className="checkout-image"
                          />
                        </td>
                        <td>
                          <p>{item.name}</p>
                          <span>x{item.qty}</span>
                        </td>

                        <td>${item.totalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          <Row className="w-100 mt-4 bg-light">
            <div>
              <p>Payment Method</p>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                className="w-100"
              >
                {methods?.map((item, index) => (
                  <FormControlLabel
                    value={item.option}
                    control={<Radio />}
                    label={item.option}
                    onChange={selectMethod}
                  />
                ))}
              </RadioGroup>
              {form[methodSelected]}
              <Button type="submit" className="mt-4">
                Place-in Order
              </Button>
            </div>
          </Row>
        </form>
      </Container>
    </div>
  );
};

export default Checkout;
