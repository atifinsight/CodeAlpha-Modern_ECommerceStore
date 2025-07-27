const express = require("express")
const Order = require("../models/Order")
const auth = require("../middleware/auth")

const router = express.Router()

// Create order
router.post("/", auth, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body

    const order = new Order({
      user: req.userId,
      items,
      totalAmount,
      shippingAddress,
      status: "pending",
    })

    await order.save()
    res.status(201).json(order)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get user orders
router.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate("items.product").sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get single order
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.userId,
    }).populate("items.product")

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.json(order)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
