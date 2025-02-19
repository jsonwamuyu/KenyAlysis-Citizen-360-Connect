// const { signupSchema, loginSchema } = require("../middlewares/validator");
// const User = require("../models/usersModel");
// const doHashing = require("../utils/hashing");
import doHashing from '../utils/hashing'
import User from '../models/usersModel'
import { signupSchema, loginSchema } from '../middlewares/validator';

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
    const { error, value } = loginSchema({ email, password });
    if (error) {
      return res
        .status(401)
        .json({ success: "false", message: error.details[0].message });
    }
  } catch (error) {
    console.log(error, "Sorry, an error occurred when trying to login.");
  }
};
