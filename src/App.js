import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Category from "./pages/category/Category";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllCatAction } from "./components/categories/categoryAction";
import LandingPage from "./pages/category/LandingPage";
import Cart from "./pages/cart/Cart";
import Signup from "./pages/signup/Signup";
import VerificationPage from "./pages/verification/VerificationPage";
import PrivateRouter from "./components/private/PrivateRouter";
import Signin from "./pages/signin/Signin";
import Checkout from "./pages/checkout/Checkout";
import { autoLogin } from "./components/signupComponent/userAction";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51LdBFlJyhE6wVt3HGo1BIm2BB8kSDr9lZcE9ahEQjcOLKyZiPfNGKauPsr3dVBh5JSZpK0uXEgKTo0MMLxDDCUrY00sbLa2hoa"
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCatAction());
  }, [dispatch]);
  useEffect(() => {
    dispatch(autoLogin());
  }, []);
  return (
    <div className="root-page">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug/:_id" element={<Category />} />
        <Route path="/landingPage/:slug/:_id" element={<LandingPage />} />
        <Route
          path="/cart"
          element={
            <PrivateRouter>
              <Cart />
            </PrivateRouter>
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account-verification" element={<VerificationPage />} />
        <Route
          path="/checkout"
          element={
            <PrivateRouter>
              <Elements stripe={stripePromise}>
                <Checkout />
              </Elements>
            </PrivateRouter>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
