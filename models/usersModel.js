const { required, boolean } = require("joi");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    typeof: String,
    required: [true, "Email is required."],
    trim: true,
    unique: [true, "This email is associated with another account"],
    minLength: [5, "Email must have minimum 5 characters."],
    lowercase: true,
  },
  verified: {
    typeof: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    select: false,
  },
  verificationCodeValidation: {
    type: code,
    select: false,
  },
  password: {
    typeof: String,
    required: [true, "Password is required."],
    select: false, // will prevent users from querying database unless explicetly told.
    trim: true,
    minLength: [8, "Password must be 8 character minimum."],
  },
  forgotPasswordCode:{
    typeof:String,
    select:false,
  },
  forgotPasswordCodeValidation:{
    typeof:number
  }
});
