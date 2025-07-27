"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Header from "./frontend/components/Header/Header"
import ProductList from "./frontend/components/ProductList/ProductList"
import ProductDetails from "./frontend/components/ProductDetails/ProductDetails"
import ShoppingCart from "./frontend/components/ShoppingCart/ShoppingCart"
import Login from "./frontend/components/Auth/Login"
import Register from "./frontend/components/Auth/Register"
import OrderProcessing from "./frontend/components/OrderProcessing/OrderProcesing"
import "./App.css"

function App() {
  const [user, setUser] = useState(null)
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id)
    if (existingItem) {
      setCartItems(
        cartItems.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const updateCartQuantity = (productId, quantity) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter((item) => item._id !== productId))
    } else {
      setCartItems(cartItems.map((item) => (item._id === productId ? { ...item, quantity } : item)))
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <Router>
      <div className="App">
        <Header user={user} setUser={setUser} cartItemsCount={cartItems.length} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductList addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/cart" element={<ShoppingCart cartItems={cartItems} updateQuantity={updateCartQuantity} />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register setUser={setUser} />} />
            <Route
              path="/checkout"
              element={
                user ? (
                  <OrderProcessing cartItems={cartItems} clearCart={clearCart} user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
