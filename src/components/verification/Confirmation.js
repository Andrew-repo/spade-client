import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
const Confirmation = () => {
  return (
    <div className="confirmation">
      <AiFillCheckCircle />
      <p>
        Thank you for verifying your account. Your account is active now.
        <Link to="/signin">Go to signin</Link>
      </p>
    </div>
  );
};

export default Confirmation;
