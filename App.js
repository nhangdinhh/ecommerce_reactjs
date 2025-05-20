import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import PaymentInfo from './components/PaymentInfo';
import PaymentSuccess from './components/PaymentSuccess';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPass from './components/ForgotPass';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState(''); // State to store the user's name

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token); // Update logged in state based on the existence of token

    const adminStatus = localStorage.getItem('isAdmin');
    setIsAdmin(!!adminStatus);

    const storedUserName = localStorage.getItem('userName'); // Assuming you store userName in localStorage
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }  
        : item
    ));
  };

  const handleLogin = (userName) => {
    setIsLoggedIn(true);
    localStorage.setItem('userName', userName); // Store userName in localStorage
    setUserName(userName);

    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus) {
      setIsAdmin(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName('');
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Router>
      <div className="app">
        <Header 
          isLoggedIn={isLoggedIn} 
          onLogout={handleLogout} 
          onLogin={handleLogin} 
          searchTerm={searchTerm} 
          handleSearch={handleSearch} 
          selectedCategory={selectedCategory} 
          handleCategoryChange={handleCategoryChange} 
        />
        <div className="main-content">
          <Routes>
            <Route path="/" element={isAdmin ? <Navigate to="/admin" /> : <Home addToCart={addToCart} isLoggedIn={isLoggedIn} searchTerm={searchTerm} selectedCategory={selectedCategory} />} />
            <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} isLoggedIn={isLoggedIn} userName={userName} />} />
            <Route path="/cart" element={isLoggedIn ? <Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} /> : <Login onLogin={handleLogin} />} />
            <Route path="/checkout" element={isLoggedIn ? <Checkout cartItems={cartItems} /> : <Login onLogin={handleLogin} />} />
            <Route path="/payment-info" element={isLoggedIn ? <PaymentInfo /> : <Login onLogin={handleLogin} />} />
            <Route path="/payment-success" element={isLoggedIn ? <PaymentSuccess /> : <Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        {!isAdmin && <Footer />}
      </div>
    </Router>
  );
}

export default App;
