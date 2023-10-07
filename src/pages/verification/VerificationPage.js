import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { SiAuthy } from "react-icons/si";
import Confirmation from "../../components/verification/Confirmation";
import { useSearchParams } from "react-router-dom";
import { verifyUser } from "../../components/signupComponent/userAction";
const VerificationPage = () => {
  const [control, setControl] = useState(false);
  const [searchURL] = useSearchParams();
  const getEmail = searchURL.get("e");
  const getCode = searchURL.get("c");

  const confirmHandle = async () => {
    const status = await verifyUser({
      email: getEmail,
      verificationCode: getCode,
    });
    if (status === "success") setControl(true);
  };
  return (
    <div className="verification-container">
      {control ? (
        <Confirmation />
      ) : (
        <div>
          <SiAuthy />
          <p>
            Thank you for creating account. In term of security purpose, please
            verify your account to activate the account.
          </p>
          <Button onClick={confirmHandle}>Activate</Button>
        </div>
      )}
    </div>
  );
};

export default VerificationPage;
