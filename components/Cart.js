import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart({ cartItems, removeFromCart, updateQuantity }) {
  const navigate = useNavigate();

  // Function to calculate the total value of the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to handle checkout
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-background"> {/* Using gradient background */}
      <div className="cart">
        <h1 className="cart-title">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <div>
            <div className="cart-header">
              <div className="cart-column">PRODUCT IMAGINE</div>
              <div className="cart-column">NAME</div>
              <div className="cart-column">PRICE</div>
              <div className="cart-column">QUANTITY</div>
              <div className="cart-column">REMOVE</div>
            </div>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-column">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                </div>
                <div className="cart-column">
                  <p>{item.name}</p>
                </div>
                <div className="cart-column">
                  <p>${item.price}</p>
                </div>
                <div className="cart-column quantity-control">
                  <button onClick={() => updateQuantity(item.id, -1)} className="quantity-btn">-</button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="quantity-btn">+</button>
                </div>
                <div className="cart-column">
                  <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
                </div>
              </div>
            ))}
            <div className="total-price">
              Total: ${calculateTotal().toFixed(2)}
            </div>
          </div>
        )}
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
