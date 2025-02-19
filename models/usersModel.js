// const mongoose = require("mongoose");
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String, // ✅ Fixed
      required: [true, "Email is required."],
      trim: true,
      unique: true, // ✅ Fixed
      minLength: [5, "Email must have minimum 5 characters."],
      lowercase: true,
    },
    verified: {
      type: Boolean, // ✅ Fixed
      default: false,
    },
    verificationCode: {
      type: String,
      select: false,
    },
    verificationCodeValidation: {
      type: Number, // ✅ Fixed
      select: false,
    },
    password: {
      type: String, // ✅ Fixed
      required: [true, "Password is required."],
      select: false, // Prevent users from querying passwords
      trim: true,
      minLength: [8, "Password must be 8 characters minimum."],
    },
    forgotPasswordCode: {
      type: String, // ✅ Fixed
      select: false,
    },
    forgotPasswordCodeValidation: {
      type: Number, // ✅ Fixed
    },
  },
  { timestamps: true } // ✅ Fixed
);

module.exports = mongoose.model("User", userSchema);
