// FlashSale.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FlashSale.css"; // Import CSS cho Flash Sale
import { getProducts } from "../components/ProductData"; // Hàm lấy danh sách sản phẩm

const FlashSale = () => {
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const products = getProducts();
    // Lọc các sản phẩm có giá giảm
    const discountedProducts = products.filter(product => product.discount > 0);
    setFlashSaleProducts(discountedProducts);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const saleEndTime = new Date().setHours(23, 59, 59); // Thiết lập thời gian kết thúc Flash Sale là 23:59:59
    const now = new Date();
    const difference = saleEndTime - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    } else {
      timeLeft = { hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  }

  return (
    <div className="flash-sale">
      <h2>Flash Sale</h2>
      <div className="countdown-timer">
        Time left: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </div>
      <div className="flash-sale-products">
        {flashSaleProducts.length > 0 ? (
          flashSaleProducts.map(product => (
            <div key={product.id} className="flash-sale-product">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="old-price">{product.oldPrice.toLocaleString()}$</p>
              <p className="new-price">{product.price.toLocaleString()}$</p>
              <p className="stock">In stock: {product.stock}</p>
              <Link to={`/products/${product.id}`} className="flash-sale-link">View Details</Link>
            </div>
          ))
        ) : (
          <p>No flash sale products available.</p>
        )}
      </div>
    </div>
  );
};

export default FlashSale;
