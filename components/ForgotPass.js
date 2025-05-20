import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ForgotPass.css';

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = () => {
    alert("Email sent successfully!");
  };

  return (
    <div className="forgot-password-container blur">
      <h1 className="forgot-password-title">Forgot Password</h1>
      <p>Please enter your email address to reset your password.</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Type your email"
        className="email-input"
      />
      <button className="reset-button" onClick={handleResetPassword}>
        Reset Password
      </button>
      <p className="back-to-login">
        Remembered your password?{" "}
        <a href="#" onClick={() => navigate("/login")}>
          Back to Login
        </a>{" "}
      </p>
    </div>
  );
};

export default ForgotPass;
