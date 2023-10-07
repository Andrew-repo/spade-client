import React from "react";

import { CardElement } from "@stripe/react-stripe-js";
const CreditCard = () => {
  return (
    // <Row className="w-100">
    //   <Col md>
    //     <Form.Label>BSB number</Form.Label>
    //     <Form.Control name="bsb" required />
    //   </Col>
    //   <Col md>
    //     <Form.Label>Account number</Form.Label>
    //     <Form.Control name="accountNumber" required />
    //   </Col>
    //   <Col md>
    //     <Form.Label>Account Name</Form.Label>
    //     <Form.Control name="accountName" required />
    //   </Col>
    //   <Col md>
    //     <Form.Label>cvc</Form.Label>
    //     <Form.Control name="cvc" required />
    //   </Col>
    // </Row>
    <div className="card-container-custom w-75">
      <CardElement />
    </div>
  );
};

export default CreditCard;
