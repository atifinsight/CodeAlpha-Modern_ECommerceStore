"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./OrderProcesing.css"

const OrderProcessing = ({ cartItems, clearCart, user }) => {
  const [orderData, setOrderData] = useState({
    shippingAddress: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "credit-card",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            product: item._id,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: totalPrice,
          shippingAddress: orderData,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        clearCart()
        setTimeout(() => {
          navigate("/")
        }, 3000)
      } else {
        setError(data.message || "Order processing failed")
      }
    } catch (err) {
      setError("Error connecting to server")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="order-processing">
        <div className="success-message">
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase. You will be redirected to the home page shortly.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="order-processing">
      <h2>Checkout</h2>

      <div className="checkout-container">
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item._id} className="order-item">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="order-total">
            <strong>Total: ${totalPrice.toFixed(2)}</strong>
          </div>
        </div>

        <div className="checkout-form">
          <h3>Shipping Information</h3>
          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="shippingAddress">Address:</label>
              <textarea
                id="shippingAddress"
                name="shippingAddress"
                value={orderData.shippingAddress}
                onChange={handleChange}
                required
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input type="text" id="city" name="city" value={orderData.city} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="postalCode">Postal Code:</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={orderData.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                name="country"
                value={orderData.country}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method:</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={orderData.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="credit-card">Credit Card</option>
                <option value="debit-card">Debit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cash-on-delivery">Cash on Delivery</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Processing..." : `Place Order - $${totalPrice.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OrderProcessing
