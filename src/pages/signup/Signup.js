import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import vranimation from "../../assets/vranime.gif";
import { Form } from "react-bootstrap";
import Header from "../../components/layout/Header";
import { postAccount } from "../../components/signupComponent/userAction";
import { toast } from "react-toastify";

const Signup = () => {
  const formInput = [
    {
      label: "First Name",
      type: "text",
      name: "fName",
      required: true,
    },
    {
      label: "Last Name",
      type: "text",
      name: "lName",
      required: true,
    },
    {
      label: "E-mail",
      type: "email",
      name: "email",
      required: true,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      required: true,
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      required: true,
    },
  ];
  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.confirmPassword === form.password) {
      const post = await postAccount(form);
    } else {
      toast.error("password does not match");
    }
  };
  return (
    <div className="w-100">
      <Header />
      <div className="sign-in-form-container">
        <Row className="w-100">
          <Col sm>
            <div className="w-100">
              <img src={vranimation} className="w-100" />
            </div>
          </Col>
          <Col sm>
            <Form
              style={{ backgroundColor: "whitesmoke" }}
              onSubmit={handleSubmit}
            >
              <h2>Sign up</h2>
              {formInput.map((item, i) => (
                <>
                  <Form.Label>{item.label}</Form.Label>
                  <Form.Control onChange={handleOnChange} {...item} />
                </>
              ))}
              <Button type="submit" className="mt-3 ">
                Sign up
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Signup;
