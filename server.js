require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const authRouter = require("./routers/authRouter");

const app = express();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000", credentials: true }));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in the .env file.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Database connection established."))
  .catch((error) => {
    console.error("❌ Could not connect to database", error);
    process.exit(1); // Exit if DB connection fails
  });

// Routes
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
