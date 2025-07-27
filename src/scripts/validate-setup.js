const fs = require("fs")
const path = require("path")

console.log("🔍 Validating project setup...\n")

const requiredFiles = [
  "package.json",
  "backend/package.json",
  "backend/server.js",
  "backend/models/User.js",
  "backend/models/Product.js",
  "backend/models/Order.js",
  "backend/routes/auth.js",
  "backend/routes/products.js",
  "backend/routes/orders.js",
  "backend/middleware/auth.js",
  "frontend/package.json",
  "frontend/src/App.jsx",
  "frontend/src/App.css",
  "scripts/seed-products.js",
]

const requiredDirectories = ["backend", "frontend", "frontend/src", "frontend/src/components", "scripts"]

let allValid = true

// Check directories
console.log("📁 Checking directories...")
requiredDirectories.forEach((dir) => {
  const dirPath = path.join(__dirname, "..", dir)
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    console.log(`✅ ${dir}`)
  } else {
    console.log(`❌ ${dir} - Missing directory`)
    allValid = false
  }
})

console.log("\n📄 Checking files...")
// Check files
requiredFiles.forEach((file) => {
  const filePath = path.join(__dirname, "..", file)
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} - Missing file`)
    allValid = false
  }
})

// Check .env file
console.log("\n⚙️ Checking environment setup...")
const envPath = path.join(__dirname, "../backend/.env")
if (fs.existsSync(envPath)) {
  console.log("✅ backend/.env file exists")

  const envContent = fs.readFileSync(envPath, "utf8")
  const requiredEnvVars = ["MONGODB_URI", "JWT_SECRET", "PORT"]

  requiredEnvVars.forEach((envVar) => {
    if (envContent.includes(envVar)) {
      console.log(`✅ ${envVar} is set`)
    } else {
      console.log(`❌ ${envVar} is missing from .env file`)
      allValid = false
    }
  })
} else {
  console.log("❌ backend/.env file is missing")
  allValid = false
}

// Check node_modules
console.log("\n📦 Checking dependencies...")
const nodeModulesPaths = ["node_modules", "backend/node_modules", "frontend/node_modules"]

nodeModulesPaths.forEach((nmPath) => {
  const fullPath = path.join(__dirname, "..", nmPath)
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${nmPath}`)
  } else {
    console.log(`⚠️ ${nmPath} - Run npm install`)
  }
})

console.log("\n" + "=".repeat(50))
if (allValid) {
  console.log("🎉 Project setup is valid!")
  console.log("\n📋 Ready to run:")
  console.log("1. Make sure MongoDB is running")
  console.log("2. npm run seed (to populate database)")
  console.log("3. npm run dev (to start the application)")
} else {
  console.log("❌ Project setup has issues. Please fix the missing files/directories.")
}
console.log("=".repeat(50))
