import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import background from "../../assets/signinBackground.jpg";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  autoLogin,
  loginAction,
} from "../../components/signupComponent/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
const Signin = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);
  const [searchParam] = useSearchParams();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(form));
  };

  const redirectedTo = location?.state?.from?.location?.pathname || "/";
  useEffect(() => {
    console.log(redirectedTo);

    user?._id && Navigate(redirectedTo);

    dispatch(autoLogin());
  }, [dispatch, user, Navigate, redirectedTo]);

  return (
    <div className="w-100">
      <Header />
      <div className="signin-container">
        <div className="signin-blur">
          <div className="form-signin">
            <div>
              <img src={background} className="w-100 h-100" />
            </div>

            <Form
              className="bg-light d-flex flex-column gap-4"
              onSubmit={handleOnSubmit}
            >
              <p>Sign In</p>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="John@gmail.com"
                onChange={handleOnChange}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="*******"
                onChange={handleOnChange}
              />
              <Button type="submit" variant="dark">
                Sign in
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
