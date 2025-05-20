
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import './ProductDetail.css';

import product1Img from '../images/product1.jpg';
import product2Img from '../images/product2.jpg';
import product3Img from '../images/product3.jpg';
import product4Img from '../images/product4.jpg';
import product5Img from '../images/product5.jpg';
import product6Img from '../images/product6.jpg';
import product7Img from '../images/product7.jpg';
import product8Img from '../images/product8.jpg';
import product9Img from '../images/product9.jpg';
import product10Img from '../images/product10.jpg';
import product11Img from '../images/product11.jpg';
import product12Img from '../images/product12.jpg';
import product13Img from '../images/product13.jpg';
import product14Img from '../images/product14.jpg';
import product15Img from '../images/product15.jpg';
import product16Img from '../images/product16.jpg';
import product17Img from '../images/product17.jpg';
import product18Img from '../images/product18.jpg';
import product19Img from '../images/product19.jpg';
import product20Img from '../images/product20.jpg';
import product21Img from '../images/product21.jpg';
import product22Img from '../images/product22.jpg';
import product23Img from '../images/product23.jpg';
import product24Img from '../images/product24.jpg';
import product25Img from '../images/product25.jpg';
import product26Img from '../images/product26.jpg';
import product27Img from '../images/product27.jpg';
import product28Img from '../images/product28.jpg';
import product29Img from '../images/product29.jpg';
import product30Img from '../images/product30.jpg';
import product31Img from '../images/product31.jpg';
import product32Img from '../images/product32.jpg';
import product33Img from '../images/product33.jpg';
import product34Img from '../images/product34.jpg';
import product35Img from '../images/product35.jpg';
import product36Img from '../images/product36.jpg';

const products = [
  { id: 1, name: 'Laptop Legion 5 Pro', price: 800, image: product1Img, description: 'Description: A powerful laptop designed for gaming and productivity.', category: 'Electronics', stock: 15 },
  { id: 2, name: 'Shirt SKT T1', price: 50, image: product2Img, description: 'Description: High-quality shirt featuring SKT T1 design.', category: 'Clothing', stock: 30 },
  { id: 3, name: 'Seiko Watch', price: 150, image: product3Img, description: 'Description: Elegant and reliable watch by Seiko.', category: 'Accessories', stock: 25 },
  { id: 4, name: 'iPhone 14 Pro', price: 600, image: product4Img, description: 'Description: Latest model of iPhone with advanced features.', category: 'Electronics', stock: 20 },
  { id: 5, name: 'Nike Running Shoes', price: 80, image: product5Img, description: 'Description: Comfortable and durable running shoes from Nike.', category: 'Clothing', stock: 40 },
  { id: 6, name: 'Levi\'s Jeans', price: 40, image: product6Img, description: 'Description: Classic Levi\'s jeans with a timeless fit.', category: 'Clothing', stock: 50 },
  { id: 7, name: 'Baseball Cap', price: 25, image: product7Img, description: 'Description: Stylish baseball cap for everyday wear.', category: 'Accessories', stock: 60 },
  { id: 8, name: 'Ray-Ban Sunglasses', price: 70, image: product8Img, description: 'Description: Iconic Ray-Ban sunglasses with UV protection.', category: 'Accessories', stock: 35 },
  { id: 9, name: 'Samsung Galaxy Tab', price: 250, image: product9Img, description: 'Description: Versatile and powerful tablet by Samsung.', category: 'Electronics', stock: 10 },
  { id: 10, name: 'Canon DSLR Camera', price: 450, image: product10Img, description: 'Description: High-resolution DSLR camera by Canon.', category: 'Electronics', stock: 5 },
  { id: 11, name: 'Bose Headphones', price: 100, image: product11Img, description: 'Description: Noise-cancelling headphones with superior sound quality.', category: 'Accessories', stock: 30 },
  { id: 12, name: 'Herschel Backpack', price: 70, image: product12Img, description: 'Description: Durable and stylish backpack by Herschel.', category: 'Bags', stock: 20 },
  { id: 13, name: 'Apple Watch', price: 150, image: product13Img, description: 'Description: Smartwatch with various health and productivity features.', category: 'Electronics', stock: 25 },
  { id: 14, name: 'JBL Bluetooth Speaker', price: 60, image: product14Img, description: 'Description: Portable and high-quality Bluetooth speaker by JBL.', category: 'Electronics', stock: 15 },
  { id: 15, name: 'Epson Projector', price: 300, image: product15Img, description: 'Description: High-definition projector by Epson.', category: 'Electronics', stock: 10 },
  { id: 16, name: 'Mechanical Keyboard', price: 120, image: product16Img, description: 'Description: Responsive and durable mechanical keyboard.', category: 'Accessories', stock: 35 },
  { id: 17, name: 'Dell Monitor', price: 200, image: product17Img, description: 'Description: High-resolution monitor by Dell.', category: 'Electronics', stock: 8 },
  { id: 18, name: 'Logitech Mouse', price: 30, image: product18Img, description: 'Description: Ergonomic and precise mouse by Logitech.', category: 'Accessories', stock: 50 },
  { id: 19, name: 'Gaming Mouse Pad', price: 10, image: product19Img, description: 'Description: Smooth and durable gaming mouse pad.', category: 'Accessories', stock: 100 },
  { id: 20, name: 'HP Printer', price: 150, image: product20Img, description: 'Description: Efficient and reliable printer by HP.', category: 'Electronics', stock: 12 },
  { id: 21, name: 'Surgical Mask', price: 5, image: product21Img, description: 'Description: High-quality surgical masks for protection.', category: 'Health & Beauty', stock: 200 },
  { id: 22, name: 'Dyson Fan', price: 45, image: product22Img, description: 'Description: Advanced cooling fan by Dyson.', category: 'Home Appliances', stock: 18 },
  { id: 23, name: 'Ielts Book', price: 20, image: product23Img, description: 'Description: Comprehensive guide for IELTS preparation.', category: 'Books', stock: 100 },
  { id: 24, name: 'USB-C Charging Cable', price: 15, image: product24Img, description: 'Description: Durable USB-C charging cable.', category: 'Electronics', stock: 80 },
  { id: 25, name: 'Philips Rice Cooker', price: 60, image: product25Img, description: 'Description: Efficient rice cooker by Philips.', category: 'Home Appliances', stock: 25 },
  { id: 26, name: 'Soccer Ball', price: 10, image: product26Img, description: 'Description: High-quality soccer ball for sports enthusiasts.', category: 'Sports', stock: 70 },
  { id: 27, name: 'Electric Kettle', price: 25, image: product27Img, description: 'Description: Fast boiling electric kettle.', category: 'Home Appliances', stock: 30 },
  { id: 28, name: 'MAC Lipstick', price: 20, image: product28Img, description: 'Description: Vibrant and long-lasting MAC lipstick.', category: 'Health & Beauty', stock: 50 },
  { id: 29, name: 'Leather Handbag', price: 50, image: product29Img, description: 'Description: Stylish leather handbag.', category: 'Bags', stock: 22 },
  { id: 30, name: 'Fishing Rod', price: 75, image: product30Img, description: 'Description: High-quality fishing rod for anglers.', category: 'Sports', stock: 40 },
  { id: 31, name: 'Non-stick Pan', price: 35, image: product31Img, description: 'Description: Durable non-stick pan for cooking.', category: 'Home Appliances', stock: 55 },
  { id: 32, name: 'Leather Wallet', price: 25, image: product32Img, description: 'Description: Elegant leather wallet.', category: 'Accessories', stock: 60 },
  { id: 33, name: 'Mixed Fruit Basket', price: 10, image: product33Img, description: 'Description: Fresh mixed fruit basket.', category: 'Food & Beverages', stock: 90 },
  { id: 34, name: 'Mineral Water Bottle', price: 2, image: product34Img, description: 'Description: Pure mineral water in a convenient bottle.', category: 'Food & Beverages', stock: 150 },
  { id: 35, name: 'Transformer Set', price: 15, image: product35Img, description: 'Description: Fun and interactive transformer toy set.', category: 'Toys & Games', stock: 80 },
  { id: 36, name: 'Paracetamol Tablets', price: 20, image: product36Img, description: 'Description: Effective pain relief with paracetamol tablets.', category: 'Health & Beauty', stock: 40 }
];


function ProductDetail({ addToCart, isLoggedIn, userName }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0); // State for star rating
  const [reviews, setReviews] = useState([
    { name: 'Nhang', rating: 4, text: 'Great product! Highly recommend.' },
    { name: 'Huy', rating: 3, text: 'Good quality but a bit expensive.' },
    { name: 'Toan', rating: 4, text: 'Great product! Highly recommend.' },
    { name: 'Bao', rating: 1, text: "I don't like XHuy! So...I vote 1 star." },
    { name: 'Tuan', rating: 2, text: 'Good~~~!' }
  ]);

  useEffect(() => {
    // Scroll to the top when component is mounted
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert('You need to login!');
    } else {
      addToCart(product);
      alert('Added to cart!');
      navigate('/cart');
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      name: userName || 'Anonymous', // Use user login name or 'Anonymous'
      rating: rating, // Use the current rating
      text: comment
    };
    setReviews([newReview, ...reviews]); // Add new review at the beginning
    setComment(""); // Reset comment after submitting
    setRating(0); // Reset rating after submitting
  };

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div className="product-detail-background">
      <div className="product-detail">
        <div className="product-detail-left">
          <img src={product.image} alt={product.name} className="product-image-large" />
        </div>
        <div className="product-detail-right">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className="product-price">Price: ${product.price}</p>
          <p>Stock: {product.stock}</p>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-list">
          {products.slice(0, 6).map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="product-link">
              <div className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="product-price">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="product-reviews">
        <h2>Product Reviews</h2>
        <form onSubmit={handleCommentSubmit}>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <FontAwesomeIcon
                key={value}
                icon={value <= rating ? solidStar : regularStar}
                onClick={() => handleRating(value)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave your comment here..."
            required
          />
          <button type="submit">Submit</button>
        </form>
        <div className="reviews-list">
          {reviews.map((review, index) => (
            <div className="review" key={index}>
              <h3>{review.name}</h3>
              <p>{'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</p>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
