import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';

// Import images
import visaImg from '../images/visa.jpg';
import masterCardImg from '../images/mastercard.jpg';
import jcbImg from '../images/jcb.jpg';

function Checkout({ cartItems }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', phone: '', address: '' });
  const [shippingMethod, setShippingMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedGateway, setSelectedGateway] = useState('');
  const [shippingFee, setShippingFee] = useState(0);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + shippingFee;
  };

  const handleShippingMethodChange = (method) => {
    setShippingMethod(method);
    switch (method) {
      case 'express':
        setShippingFee(50);
        break;
      case 'fast':
        setShippingFee(30);
        break;
      case 'standard':
        setShippingFee(15);
        break;
      default:
        setShippingFee(0);
    }
  };

  const handlePaymentGatewayChange = (gateway) => {
    setSelectedGateway(gateway);
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (!shippingMethod || !paymentMethod) {
      alert('Please select a shipping method and a payment method.');
      return;
    }

    if (paymentMethod === 'online' && !selectedGateway) {
      alert('Please select a payment gateway.');
      return;
    }

    // Save user information
    try {
      await axios.post('http://localhost:5000/api/users', user);
    } catch (error) {
      console.error('Error saving user:', error);
    }

    // Save order information
    const order = {
      user: user,
      items: cartItems,
      shippingMethod,
      paymentMethod,
      paymentGateway: paymentMethod === 'online' ? selectedGateway : 'Cash on Delivery',
      orderDate: new Date().toISOString(),
      totalAmount: calculateTotal()
    };

    try {
      await axios.post('http://localhost:5000/api/orders', order);
      navigate('/payment-success');
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="checkout-background">
      <div className="checkout">
        <h1 className="checkout-title">Checkout</h1>
        <div className="checkout-header">
          <div className="checkout-column">Product Image</div>
          <div className="checkout-column">Name</div>
          <div className="checkout-column">Price</div>
          <div className="checkout-column">Quantity</div>
        </div>
        <div className="checkout-items">
          {cartItems.map((item) => (
            <div key={item.id} className="checkout-item">
              <div className="checkout-column">
                <img src={item.image} alt={item.name} className="checkout-item-image" />
              </div>
              <div className="checkout-column">
                <p>{item.name}</p>
              </div>
              <div className="checkout-column">
                <p>${item.price}</p>
              </div>
              <div className="checkout-column">
                <p>{item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="shipping-methods">
          <h3>Select Shipping Method</h3>
          <div
            className={`shipping-method ${shippingMethod === 'express' ? 'selected' : ''}`}
            onClick={() => handleShippingMethodChange('express')}
          >
            Express (+$50)
          </div>
          <div
            className={`shipping-method ${shippingMethod === 'fast' ? 'selected' : ''}`}
            onClick={() => handleShippingMethodChange('fast')}
          >
            Fast (+$30)
          </div>
          <div
            className={`shipping-method ${shippingMethod === 'standard' ? 'selected' : ''}`}
            onClick={() => handleShippingMethodChange('standard')}
          >
            Standard (+$15)
          </div>
        </div>

        <div className="payment-methods">
          <h3>Select Payment Method</h3>
          <div
            className={`payment-method ${paymentMethod === 'online' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('online')}
          >
            Online Payment
          </div>
          <div
            className={`payment-method ${paymentMethod === 'cash' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('cash')}
          >
            Cash on Delivery
          </div>
        </div>

        {paymentMethod === 'online' && (
          <div className="payment-details">
            <p>You have selected Online Payment.</p>
            <p>Please choose your payment gateway:</p>
            <ul className="payment-gateways">
              <li
                className={`gateway-item ${selectedGateway === 'visa' ? 'selected' : ''}`}
                onClick={() => handlePaymentGatewayChange('visa')}
              >
                <img src={visaImg} alt="Visa" /> Visa
              </li>
              <li
                className={`gateway-item ${selectedGateway === 'masterCard' ? 'selected' : ''}`}
                onClick={() => handlePaymentGatewayChange('masterCard')}
              >
                <img src={masterCardImg} alt="MasterCard" /> MasterCard
              </li>
              <li
                className={`gateway-item ${selectedGateway === 'jcb' ? 'selected' : ''}`}
                onClick={() => handlePaymentGatewayChange('jcb')}
              >
                <img src={jcbImg} alt="JCB" /> JCB
              </li>
            </ul>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="billing-information">
          <h2>Payment Information</h2>
          <label>
            Name:
            <input type="text" name="name" value={user.name} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={user.email} onChange={handleChange} required />
          </label>
          <label>
            Phone:
            <input type="text" name="phone" value={user.phone} onChange={handleChange} required />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={user.address} onChange={handleChange} required />
          </label>

          <div className="total-price">
            Total: ${calculateTotal().toFixed(2)}
          </div>
          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
