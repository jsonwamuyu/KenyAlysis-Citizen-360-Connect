const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");

const app = express();

// const PORT = process.env.PORT
const PORT = 8080;

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connection established.");
  })
  .catch((error) => {
    console.log("Could not connect to database", error);
  });

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

//
app.listen(PORT, () => {
  console.log(`App started on https://localhost:8080`);
});
