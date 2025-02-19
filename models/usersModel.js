// const mongoose = require("mongoose");
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      unique: true,
      minLength: [5, "Email must have minimum 5 characters."],
      lowercase: true,
    },
    verified: {
      type: Boolean, 
      default: false,
    },
    verificationCode: {
      type: String,
      select: false,
    },
    verificationCodeValidation: {
      type: Number,
      select: false,
    },
    password: {
      type: String, 
      required: [true, "Password is required."],
      select: false, 
      trim: true,
      minLength: [8, "Password must be 8 characters minimum."],
    },
    forgotPasswordCode: {
      type: String, 
      select: false,
    },
    forgotPasswordCodeValidation: {
      type: Number, 
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("User", userSchema);
