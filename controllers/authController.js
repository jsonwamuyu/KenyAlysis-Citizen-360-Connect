import jwt from "jsonwebtoken";
import doHashing from "../utils/hashing";
import User from "../models/usersModel";
import { signupSchema, loginSchema } from "../middlewares/validator";
import transport from "../middlewares/sendEmail";

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
      process.env.TOKEN_SECRET,
      { expiresIn: "8h" }
    );

    // TODO: Check whether shoulD be development and production or both should be production
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

exports.logout = async (req, res) => {
  res
    .clearCookie("Authorization")
    .status(200)
    .json({ success: true, message: "Logged out successfully." });
};

// A function to send an email to the users to verify their account
exports.sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if user exist using the provided email address
    const existingUser = await User.findOne({ email });
    // If no existing user
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User with this email does not exist.",
      });
      // If user exist
      if (existingUser.verified) {
        return res.status(400).json({
          success: false,
          message: "This account is already verified.",
        });
      }
      // If not verified, generate a code and send it
      const codeVerify = Math.floor(Math.random() * 1000000).toString();

      let info = await transport.sendMail({
        from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
        to: existingUser.email,
        subject: "Verification Code",
        html: "<h1>" + codeVerify + "</h1>",
      });
      // Check if email code was sent successfully
      if (info.accepted[0] === existingUser.email) {
        // Save it in the database (hash it before installing it)
        const hashedCodeValue = hmacCodeHashingProcess(
          codeVerify,
          process.env.HMAC_VERIFICATION_CODE_SECRET
        );
        // Update the verification code in the database
        existingUser.verified = hashedCodeValue;
        existingUser.verificationCodeValidation = Date.now();
        await existingUser.save();
        return res.status(200).json({ success: true, message: "Code sent" });
      }
      // Else code sent failed
      res.status("400").json({ success: false, message: "code sent failed." });
    }
  } catch (error) {
    console.log(error);
  }
};
