"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./ProductList.css"

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      } else {
        setError("Failed to fetch products")
      }
    } catch (err) {
      setError("Error connecting to server")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading products...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="product-list">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img src={product.image || "/placeholder.svg?height=200&width=200"} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-price">${product.price}</div>
              <div className="product-stock">Stock: {product.stock}</div>
              <div className="product-actions">
                <Link to={`/product/${product._id}`} className="btn btn-secondary">
                  View Details
                </Link>
                <button onClick={() => addToCart(product)} className="btn btn-primary" disabled={product.stock === 0}>
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
