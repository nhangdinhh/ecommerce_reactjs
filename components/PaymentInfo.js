import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentInfo.css'; // Import CSS nếu cần

const PaymentInfo = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    tel: '',
    email: '',
    note: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý thông tin thanh toán ở đây
    navigate('/payment-success'); // Chuyển đến trang thanh toán thành công sau khi xử lý xong
  };

  return (
    <div className="payment-info">
      <h2>Payment Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="tel">Telephone</label>
          <input type="text" id="tel" name="tel" value={formData.tel} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="note">Note</label>
          <textarea id="note" name="note" value={formData.note} onChange={handleChange} />
        </div>
        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  );
};

export default PaymentInfo;
