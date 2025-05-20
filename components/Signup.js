import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = "Full name is required";

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!phone) newErrors.phone = "Phone number is required";
    if (!username) newErrors.username = "Username is required";

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = "Password must contain at least one special character";
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!birthDate) newErrors.birthDate = "Birth date is required";
    if (!address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    const validationPassed = validateFields();
    if (!validationPassed) {
      alert("Please fill out all required fields and check for errors.");
      return;
    }
    
    // Lưu thông tin người dùng vào local storage
    const user = { fullName, email, phone, username, password, birthDate, address };
    localStorage.setItem('user', JSON.stringify(user));
    
    alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <button className="close-button" onClick={() => navigate("/#")}>
        <i className="bi bi-x"></i> {/* X icon */}
      </button>
      <h1 className="signup-title">Sign Up</h1>
      <input
        className="signup-input"
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      {errors.fullName && <div className="error-message">{errors.fullName}</div>}
      
      <input
        className="signup-input"
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <div className="error-message">{errors.email}</div>}
      
      <input
        className="signup-input"
        type="text"
        name="phone"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      {errors.phone && <div className="error-message">{errors.phone}</div>}
      
      <input
        className="signup-input"
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {errors.username && <div className="error-message">{errors.username}</div>}
      
      <input
        className="signup-input"
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <div className="error-message">{errors.password}</div>}
      
      <input
        className="signup-input"
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
      
      <input
        className="signup-input"
        type="date"
        name="birthDate"
        placeholder="Birth Date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      {errors.birthDate && <div className="error-message">{errors.birthDate}</div>}
      
      <input
        className="signup-input"
        type="text"
        name="address"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      {errors.address && <div className="error-message">{errors.address}</div>}
      
      <button className="signup-button" onClick={handleSignup}>
        SIGN UP
      </button>
      
      <div className="login-switch">
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
