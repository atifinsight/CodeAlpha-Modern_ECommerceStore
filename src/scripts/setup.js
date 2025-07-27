const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

console.log("🚀 Setting up MERN E-commerce Store...\n")

// Function to run commands
function runCommand(command, cwd = process.cwd()) {
  try {
    console.log(`Running: ${command}`)
    execSync(command, { cwd, stdio: "inherit" })
    console.log("✅ Success!\n")
  } catch (error) {
    console.error(`❌ Error running command: ${command}`)
    console.error(error.message)
    process.exit(1)
  }
}

// Function to create .env file if it doesn't exist
function createEnvFile() {
  const envPath = path.join(__dirname, "../backend/.env")

  if (!fs.existsSync(envPath)) {
    const envContent = `MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000`

    fs.writeFileSync(envPath, envContent)
    console.log("✅ Created .env file in backend directory\n")
  } else {
    console.log("✅ .env file already exists\n")
  }
}

// Main setup function
async function setup() {
  try {
    // Install root dependencies
    console.log("📦 Installing root dependencies...")
    runCommand("npm install")

    // Install backend dependencies
    console.log("📦 Installing backend dependencies...")
    runCommand("npm install", path.join(__dirname, "../backend"))

    // Install frontend dependencies
    console.log("📦 Installing frontend dependencies...")
    runCommand("npm install", path.join(__dirname, "../frontend"))

    // Create .env file
    console.log("⚙️ Setting up environment variables...")
    createEnvFile()

    console.log("🎉 Setup completed successfully!")
    console.log("\n📋 Next steps:")
    console.log("1. Make sure MongoDB is running on your system")
    console.log('2. Run "npm run seed" to populate the database with sample products')
    console.log('3. Run "npm run dev" to start both frontend and backend servers')
    console.log("4. Open http://localhost:3000 in your browser")
  } catch (error) {
    console.error("❌ Setup failed:", error.message)
    process.exit(1)
  }
}

setup()
