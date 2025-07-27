const express = require("express")
const Product = require("../models/Product")

const router = express.Router()

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    res.json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create product (for testing purposes)
router.post("/", async (req, res) => {
  try {
    const { name, description, price, stock, image } = req.body

    const product = new Product({
      name,
      description,
      price,
      stock,
      image,
    })

    await product.save()
    res.status(201).json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
