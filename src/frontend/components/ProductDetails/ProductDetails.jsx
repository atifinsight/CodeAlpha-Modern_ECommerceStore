"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./ProductDetails.css"

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      } else {
        setError("Product not found")
      }
    } catch (err) {
      setError("Error connecting to server")
    } finally {
      setLoading(false)
    }
  };
  
  fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    navigate("/cart")
  }

  if (loading) return <div className="loading">Loading product...</div>
  if (error) return <div className="error">{error}</div>
  if (!product) return <div className="error">Product not found</div>

  return (
    <div className="product-details">
      <button onClick={() => navigate(-1)} className="btn btn-secondary back-btn">
        ← Back
      </button>

      <div className="product-details-container">
        <div className="product-image-large">
          <img src={product.image || "/placeholder.svg?height=400&width=400"} alt={product.name} />
        </div>

        <div className="product-info-detailed">
          <h1>{product.name}</h1>
          <div className="product-price-large">${product.price}</div>
          <div className="product-stock-info">
            <span className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <div className="product-description-full">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {product.stock > 0 && (
            <div className="purchase-section">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <select id="quantity" value={quantity} onChange={(e) => setQuantity(Number.parseInt(e.target.value))}>
                  {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={handleAddToCart} className="btn btn-primary add-to-cart-btn">
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
