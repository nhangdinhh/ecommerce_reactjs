import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Featured from './Banner';
import FlashSale from './FlashSale';
import TechNews from './News';
import './Home.css';

function Home({ searchTerm, selectedCategory }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    // Kết nối WebSocket
    const ws = new WebSocket('ws://localhost:5000');
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case 'NEW_PRODUCT':
          setProducts((prev) => [...prev, message.product]);
          break;
        case 'UPDATE_PRODUCT':
          setProducts((prev) =>
            prev.map((product) => product.id === message.product.id ? message.product : product)
          );
          break;
        case 'DELETE_PRODUCT':
          setProducts((prev) =>
            prev.filter((product) => product.id !== message.id)
          );
          break;
        default:
          break;
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const filteredProducts = products.filter((product) => {
    const isNameMatch = product.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    const isCategoryMatch = selectedCategory === 'All Categories' || product.category === selectedCategory;
    return isNameMatch && isCategoryMatch;
  });

  return (
    <div className="home">
      <Featured />
      <FlashSale />
      
      <h2 className="product-list-title">Product List</h2>
      
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="product-link">
              <div className="product-card">
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.name} className="product-image" />
                </div>
                <div className="product-info">
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-price">${product.price}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <TechNews />
    </div>
  );
}

export default Home;
