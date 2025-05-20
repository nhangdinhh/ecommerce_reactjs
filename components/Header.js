import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ isLoggedIn, onLogout, searchTerm, handleSearch, selectedCategory, handleCategoryChange }) {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Lấy tên tài khoản từ localStorage

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const scrollToFooter = (event) => {
    event.preventDefault();
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn('Footer element not found');
    }
  };

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 bg-body rounded">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand" to="/">xyzShop</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            {!isAdmin && (
              <>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">
                      <i className="fas fa-home"></i> Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      <i className="fas fa-shopping-cart"></i> Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/checkout">
                      <i className="fas fa-search"></i> Checkout
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#footer" onClick={scrollToFooter}>
                      <i className="fas fa-pencil-alt"></i> Contact us
                    </a>
                  </li>
                </ul>
                <div className="search-categories-container d-flex align-items-center">
                  <input
                    className="search-bar"
                    type="search"
                    placeholder="Search by name"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <select
                    className="categories-select"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Clothing</option>
                    <option>Accessories</option>
                    <option>Bags</option>
                    <option>Books</option>
                    <option>Food & Beverages</option>
                    <option>Health & Beauty</option>
                    <option>Home Appliances</option>
                    <option>Sports</option>
                    <option>Toys & Games</option>
                  </select>
                </div>
              </>
            )}
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <i className="fas fa-user user-icon"></i>
            <span className="username">{isLoggedIn ? username : 'Guest'}</span> {/* Hiển thị tên người dùng hoặc 'Guest' */}
            {isLoggedIn ? (
              <button className="btn btn-outline-dark ms-2" onClick={handleLogoutClick}>Logout</button>
            ) : (
              <button className="btn btn-outline-dark ms-2" onClick={handleLoginClick}>Login</button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;


