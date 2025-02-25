require("dotenv").config(); // Add this at the top

const express = require("express");

const cors = require("cors");

const helmet = require("helmet");
const mongoose = require("mongoose");


const authRouter = require("./routers/authRouter");

const app = express();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Database connection established."))
  .catch((error) => console.error("❌ Could not connect to database", error));


app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

// Listen
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
