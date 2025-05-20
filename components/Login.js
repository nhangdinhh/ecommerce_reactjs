import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (value === "") {
      setUsernameError("Username is required");
    } else if (!/^[a-zA-Z]/.test(value)) {
      setUsernameError("Username must start with a letter");
    } else if (/[^a-zA-Z0-9]/.test(value)) {
      setUsernameError("Username cannot contain special characters");
    } else {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill out all fields.");
      return;
    }

    if (username === 'admin' && password === 'N1234567@') {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('username', username); // Lưu tên tài khoản vào localStorage
      onLogin(username); // Gọi hàm onLogin để cập nhật trạng thái đăng nhập
      navigate('/admin'); // Điều hướng đến trang quản lý admin
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.username === username && user.password === password) {
        alert("Login successful!");
        localStorage.setItem('accessToken', 'dummy-token'); // Đặt một token giả lập vào localStorage
        localStorage.setItem('username', username); // Lưu tên tài khoản vào localStorage
        onLogin(username); // Gọi hàm onLogin để cập nhật trạng thái đăng nhập
        navigate("/"); // Điều hướng đến trang chủ
      } else {
        alert("Invalid username or password");
      }
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <div className="input-form-name">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
        </svg>
        <input
          type="text"
          placeholder="Type your username"
          value={username}
          onChange={handleUsernameChange}
        />
        {usernameError && <div className="error-message">{usernameError}</div>}
      </div>
      <div className="input-form-name">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
        </svg>
        <input
          type="password"
          placeholder="Type your password"
          value={password}
          onChange={handlePasswordChange}
        />
        <a href="#"><i className="bi bi-eye-slash"></i></a>
        {passwordError && <div className="error-message">{passwordError}</div>}
      </div>
      <div className="forgot-password">
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
      <div className="container-login-button">
        <button className="login-button" onClick={handleLogin}>LOGIN</button>
      </div>
      <div className="signup-switch">
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
