const mongoose = require("mongoose")
const path = require("path")

// Add the backend directory to the require path
const Product = require("../backend/models/Product")

// Connect to MongoDB using environment variable or default
const mongoUri = process.env.MONGODB_URI || "mongodb+srv://asif746987:asif746987@e-commerce.6o8c9yj.mongodb.net/?retryWrites=true&w=majority&appName=E-Commerce"

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 99.99,
    stock: 50,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Smart Fitness Watch",
    description:
      "Advanced fitness tracker with heart rate monitoring, GPS, and smartphone connectivity. Track your health and stay connected.",
    price: 199.99,
    stock: 30,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Portable Laptop Stand",
    description:
      "Ergonomic aluminum laptop stand that's adjustable and portable. Improve your posture while working from anywhere.",
    price: 49.99,
    stock: 75,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.",
    price: 29.99,
    stock: 100,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "4K Webcam",
    description: "Ultra HD 4K webcam with auto-focus and built-in microphone. Perfect for video calls and streaming.",
    price: 79.99,
    stock: 25,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Mechanical Gaming Keyboard",
    description:
      "RGB backlit mechanical keyboard with customizable keys and tactile switches. Built for gaming and productivity.",
    price: 129.99,
    stock: 40,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "USB-C Hub",
    description:
      "Multi-port USB-C hub with HDMI, USB 3.0, and SD card slots. Expand your laptop's connectivity options.",
    price: 39.99,
    stock: 60,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Bluetooth Speaker",
    description:
      "Portable waterproof Bluetooth speaker with 360-degree sound and 12-hour battery life. Perfect for outdoor adventures.",
    price: 69.99,
    stock: 35,
    image: "/placeholder.svg?height=300&width=300",
  },
]

async function seedProducts() {
  try {
    console.log("Connecting to MongoDB...")
    console.log("MongoDB URI:", mongoUri)

    // Wait for connection
    await mongoose.connection.once("open", () => {
      console.log("Connected to MongoDB successfully")
    })

    // Clear existing products
    const deleteResult = await Product.deleteMany({})
    console.log(`Cleared ${deleteResult.deletedCount} existing products`)

    // Insert sample products
    const insertResult = await Product.insertMany(sampleProducts)
    console.log(`Successfully inserted ${insertResult.length} sample products:`)

    insertResult.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price} (Stock: ${product.stock})`)
    })

    console.log("\n✅ Database seeding completed successfully!")
  } catch (error) {
    console.error("❌ Error seeding products:", error.message)
    if (error.code === "ECONNREFUSED") {
      console.error("Make sure MongoDB is running on your system")
    }
  } finally {
    await mongoose.connection.close()
    console.log("Database connection closed")
    process.exit(0)
  }
}

// Handle process termination
process.on("SIGINT", async () => {
  console.log("\nReceived SIGINT. Closing database connection...")
  await mongoose.connection.close()
  process.exit(0)
})

// Run the seeding function
console.log("🌱 Starting database seeding process...")
seedProducts()
