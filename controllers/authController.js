// const { signupSchema, loginSchema } = require("../middlewares/validator");
// const User = require("../models/usersModel");
// const doHashing = require("../utils/hashing");
import jwt from "jsonwebtoken";
import doHashing from "../utils/hashing";
import User from "../models/usersModel";
import { signupSchema, loginSchema } from "../middlewares/validator";

exports.signup = async (req, res) => {
  // extract email and password from the request body
  const { email, password } = req.body;
  try {
    // Before storing user data, check whether they provide valid data
    const { error, value } = signupSchema.validate({ email, password });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }
    // If there is no error check whether user with such email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists." });
    }
    // If user does not exist, hatch the password and store user into the database
    const hashedPassword = await doHashing(password, 12);

    // initialize a new user
    const newUser = User({
      email,
      password: hashedPassword,
    });

    // Save the new user
    const results = await newUser.save();

    // mongoose will return both email and password, we do not want to serve the password, make it undefined
    results.password = undefined;
    res.status(2001).json({
      success: true,
      message: "Account created successfully.",
      results,
    });
  } catch (error) {
    console.log("Sorry, an error occurred when trying to signup.", error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error, value } = loginSchema.validate({ email, password });
    if (error) {
      return res
        .status(401)
        .json({ success: "false", message: error.details[0].message });
    }
    // If theres no error, query the database
    const existingUser = await User.findOne({ email }).select("+password");
    // if no exciting user
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist" });
    }
    // If user exist, compare the password
    const results = await comparePasswords(password, existingUser.password);

    // provided password dont match with the one in database
    if (!results) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }
    // create a token
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        verified: existingUser.verified,
      },
      process.env.TOKEN_SECRET
    );
    res
      .cookie("Authorization", "Bearer" + token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: process.env.NODE_ENV === "development",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ success: true, token, message: "Logged in successfully" });
  } catch (error) {
    console.log(error, "Sorry, an error occurred when trying to login.");
  }
};
