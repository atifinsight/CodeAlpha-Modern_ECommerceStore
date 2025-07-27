"use client"
import { Link } from "react-router-dom"
import "./ShoppingCart.css"

const ShoppingCart = ({ cartItems, updateQuantity }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="shopping-cart">
        <h2>Shopping Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <div className="cart-item-image">
              <img src={item.image || "/placeholder.svg?height=100&width=100"} alt={item.name} />
            </div>
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-item-price">${item.price}</p>
            </div>
            <div className="cart-item-quantity">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="quantity-btn">
                  -
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="quantity-btn">
                  +
                </button>
              </div>
            </div>
            <div className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</div>
            <button onClick={() => updateQuantity(item._id, 0)} className="btn btn-danger remove-btn">
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div>
        <div className="cart-actions">
          <Link to="/" className="btn btn-secondary">
            Continue Shopping
          </Link>
          <Link to="/checkout" className="btn btn-primary">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart
