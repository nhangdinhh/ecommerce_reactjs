import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentSuccess.css'; // Import CSS nếu cần

const PaymentSuccess = () => {
  return (
    <div className="payment-success">
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase.</p>
      <Link to="/" className="btn">Go to Home</Link>
    </div>
  );
};

export default PaymentSuccess;
