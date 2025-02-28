const transport = require("../middlewares/sendEmail.js");
const jwt = require("jsonwebtoken");
const sql = require("mssql");
const bcrypt = require("bcryptjs");
const db = require("../config/db");
const sendEmail = require("../middlewares/sendEmail");
const {
  signupSchema,
  loginSchema,
  changePasswordSchema,
} = require("../middlewares/validator");
// const transport = require("../middlewares/sendEmail");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = loginSchema.validate({ email, password });
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    // Get database connection
    const pool = await db;
    // Query user for email
    const user = await pool
      .request()
      .input("email", sql.VarChar(255), email)
      .query(
        "SELECT id, email, password, role_id FROM Users WHERE email=@email"
      );
    if (user.recordset.length === 0)
      return res
        .status(401)
        .json({ success: false, message: "User does not exist." });

    const validPassword = await bcrypt.compare(
      password,
      user.recordset[0].password
    );
    if (!validPassword)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });

    const token = jwt.sign(
      {
        userId: user.recordset[0].id,
        email: user.recordset[0].email,
        verified: user.recordset[0].verified,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "8h" }
    );
    res
      .cookie("Authorization", "Bearer " + token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({ success: true, token, message: "Logged in successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  res
    .clearCookie("Authorization")
    .status(200)
    .json({ success: true, message: "Logged out successfully." });
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const { error } = signupSchema.validate({ username, email, password });
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    const pool = await db;
    const checkUser = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Users WHERE email = @email");

    if (checkUser.recordset.length > 0)
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 12);
    await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, hashedPassword)
      .query(
        "INSERT INTO Users (username, email, password, role_id) VALUES (@username, @email, @password, 1)"
      );

    await sendEmail(
      email,
      "Welcome to Kenyalysis!",
      "Hello! Thank you for signing up.",
      `<h1>Hello! ${username} </h1><p>Thank you for signing up.</p>`
    )
      .then(() => console.log("✅ Email sent successfully"))
      .catch((err) => console.log("❌ Failed to send email:", err));

    res
      .status(201)
      .json({ success: true, message: "Account created successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const sendForgotPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const pool = await db;

    // Check if user exists
    const user = await pool
      .request()
      .input("email", sql.NVarChar(255), email)
      .query("SELECT id FROM Users WHERE email = @email");

    if (user.recordset.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    // Generate a JWT reset token valid for 30 minutes
    const resetToken = jwt.sign(
      { userId: user.recordset[0].id, email },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: "10m" }
    );
    console.log(token)

    // Generate reset password link
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    // Send email with the reset link
    await sendEmail(
      email,
      "Reset Your Password",
      "Password Reset Request",
      `
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 10 minutes.</p>
      `,
    );

    res
      .status(200)
      .json({
        success: true,
        message:
          "Password reset link sent to your email. Check your inbox. Don't forget to check spam folder.",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;
  try {
    if (!token) return res.status(400).json({ success: false, message: "Invalid or expired token." });

    // Verify token
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    const userId = decoded.userId;

    if (!newPassword || !confirmPassword)
      return res.status(400).json({ success: false, message: "Both password fields are required." });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ success: false, message: "Passwords do not match." });

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    const pool = await db;
    await pool.request()
      .input("id", sql.Int, userId)
      .input("password", sql.NVarChar(255), hashedPassword)
      .query("UPDATE Users SET password = @password WHERE id = @id");

    res.status(200).json({ success: true, message: "Password reset successful. Please log in with your new password." });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid or expired token.",
      error: error.message,
    });
  }
};








const sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await db.query(
      "SELECT id, verified FROM Users WHERE email = @email",
      { email }
    );
    if (user.recordset.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    if (user.recordset[0].verified)
      return res
        .status(400)
        .json({ success: false, message: "Account already verified." });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await db.query(
      "UPDATE Users SET verification_code = @code, verification_code_validation = GETDATE() WHERE email = @email",
      { code, email }
    );
    await transport.sendMail({
      from: process.env.NODE_EMAIL,
      to: email,
      subject: "Verification Code",
      text: `Your verification code is ${code}`,
    });

    res.status(200).json({ success: true, message: "Verification code sent." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const verifyVerificationCode = async (req, res) => {
  const { email, providedCode } = req.body;
  try {
    const user = await db.query(
      "SELECT verification_code, verification_code_validation FROM Users WHERE email = @email",
      { email }
    );
    if (user.recordset.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    if (user.recordset[0].verification_code !== providedCode)
      return res
        .status(400)
        .json({ success: false, message: "Invalid verification code." });

    await db.query(
      "UPDATE Users SET verified = 1, verification_code = NULL, verification_code_validation = NULL WHERE email = @email",
      { email }
    );
    res
      .status(200)
      .json({ success: true, message: "Account verified successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  const { userId } = req.user;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await db.query("SELECT password FROM Users WHERE id = @id", {
      id: userId,
    });
    if (user.recordset.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    const validPassword = await bcrypt.compare(
      oldPassword,
      user.recordset[0].password
    );
    if (!validPassword)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect old password." });

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await db.query("UPDATE Users SET password = @password WHERE id = @id", {
      password: hashedPassword,
      id: userId,
    });

    res
      .status(200)
      .json({ success: true, message: "Password changed successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  sendVerificationCode,
  signup,
  logout,
  login,
  changePassword,
  verifyVerificationCode,
  sendForgotPasswordEmail,
  resetPassword
};

// exports.signup = async (req, res) => {
//   // extract email and password from the request body
//   const { username,email, password } = req.body;
//   try {
//     // Before storing user data, check whether they provide valid data
//     const { error, value } = signupSchema.validate({ username,email, password });
//     if (error) {
//       return res
//         .status(401)
//         .json({ success: false, message: error.details[0].message });
//     }
//     // If there is no error check whether user with such email exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(401)
//         .json({ success: false, message: "User already exists." });
//     }
//     // If user does not exist, hatch the password and store user into the database
//     const hashedPassword = await doHashing(password, 12);

//     // initialize a new user
//     const newUser = User({
//       email,
//       password: hashedPassword,
//     });

//     // Save the new user
//     const results = await newUser.save();

//     // mongoose will return both email and password, we do not want to serve the password, make it undefined
//     results.password = undefined;
//     res.status(2001).json({
//       success: true,
//       message: "Account created successfully.",
//       results,
//     });
//   } catch (error) {
//     console.log("Sorry, an error occurred when trying to signup.", error);
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const { error, value } = loginSchema.validate({ email, password });
//     if (error) {
//       return res
//         .status(401)
//         .json({ success: false, message: error.details[0].message });
//     }
//     // If theres no error, query the database
//     const existingUser = await User.findOne({ email }).select("+password");
//     // if no exciting user
//     if (!existingUser) {
//       return res
//         .status(401)
//         .json({ success: false, message: "User does not exist" });
//     }
//     // If user exist, compare the password
//     const results = await comparePasswords(password, existingUser.password);

//     // provided password don't match with the one in database
//     if (!results) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid credentials." });
//     }
//     // create a token
//     const token = jwt.sign(
//       {
//         userId: existingUser._id,
//         email: existingUser.email,
//         verified: existingUser.verified,
//       },
//       process.env.TOKEN_SECRET,
//       { expiresIn: "8h" }
//     );

//     // TODO: Check whether should be development and production or both should be production
//     res
//       .cookie("Authorization", "Bearer" + token, {
//         expires: new Date(Date.now() + 8 * 3600000),
//         httpOnly: process.env.NODE_ENV === "development",
//         secure: process.env.NODE_ENV === "production",
//       })
//       .json({ success: true, token, message: "Logged in successfully" });
//   } catch (error) {
//     console.log(error, "Sorry, an error occurred when trying to login.");
//   }
// };

// exports.logout = async (req, res) => {
//   res
//     .clearCookie("Authorization")
//     .status(200)
//     .json({ success: true, message: "Logged out successfully." });
// };

// // A function to send an email to the users to verify their account
// exports.sendVerificationCode = async (req, res) => {
//   const { email } = req.body;
//   try {
//     // Check if user exist using the provided email address
//     const existingUser = await User.findOne({ email });
//     // If no existing user
//     if (!existingUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User with this email does not exist.",
//       });
//       // If user exist
//       if (existingUser.verified) {
//         return res.status(400).json({
//           success: false,
//           message: "This account is already verified.",
//         });
//       }
//       // If not verified, generate a code and send it
//       const codeVerify = Math.floor(Math.random() * 1000000).toString();

//       let info = await transport.sendMail({
//         from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
//         to: existingUser.email,
//         subject: "Verification Code",
//         html: "<h1>" + codeVerify + "</h1>",
//       });
//       // Check if email code was sent successfully
//       if (info.accepted[0] === existingUser.email) {
//         // Save it in the database (hash it before installing it)
//         const hashedCodeValue = hmacCodeHashingProcess(
//           codeVerify,
//           process.env.HMAC_VERIFICATION_CODE_SECRET
//         );
//         // Update the verification code in the database
//         existingUser.verified = hashedCodeValue;
//         existingUser.verificationCodeValidation = Date.now();
//         await existingUser.save();
//         return res.status(200).json({ success: true, message: "Code sent" });
//       }
//       // Else code sent failed
//       res.status("400").json({ success: false, message: "code sent failed." });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.verifyVerificationCode = async (req, res) => {
//   const { email, providedCode } = req.body;
//   try {
//     // Validate input from user
//     const { error, value } = acceptedCodeSchema.validate({
//       email,
//       providedCode,
//     });
//     // if error then throw an error
//     if (error) {
//       return res
//         .status(401)
//         .json({ success: false, message: error.details[0].message });
//     }
//     // Check whether user with this email exist in the database
//     const codeValue = providedCode.toString();
//     const existingUser = await User.findOne({ email }).select(
//       "+verificationCode+verificationCodeVerified"
//     );
//     if (!existingUser) {
//       return res
//         .status(401)
//         .json({ success: false, message: "User does not exist" });
//     }
//     if (existingUser.verified) {
//       return res
//         .status(400)
//         .json({ success: false, message: "You are already verified." });
//     }
//     if (
//       !existingUser.verificationCode ||
//       !existingUser.verificationCodeValidation
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Something is wrong with your verification code",
//       });
//     }
//     // check whether the code has expired after 5 mins
//     if (Date.now() - existingUser.verificationCodeValidation > 5 * 60 * 1000) {
//       return res
//         .status(400)
//         .json({ success: false, message: "This code is already expired" });
//     }
//     const hashedCodeValue = hmacCodeHashingProcess(
//       codeValue,
//       process.env.HMAC_VERIFICATION_CODE_SECRET
//     );
//     if (hashedCodeValue === existingUser.verificationCode) {
//       existingUser.verified = true;
//       existingUser.verificationCode = undefined;
//       existingUser.verificationCodeValidation = undefined;
//       await existingUser.save();
//       return res
//         .status(200)
//         .json({ success: true, message: "Your account has been verified." });
//     }
//     return res
//       .status(400)
//       .json({ success: false, message: "something unexpected occurred." });
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.changePassword = async (req, res) => {
//   // To change password, the user needs to be logged in
//   const { userId, verified } = req.user; // getting "user" from the identifyUser() where it's restricting unauthorized access
//   const { oldPassword, newPAssword } = req.body;
//   try {
//     const { error, value } = changePasswordSchema.validate({
//       oldPassword,
//       newPAssword,
//     });
//     if (error) {
//       res
//         .status(401)
//         .json({ success: false, message: error.details[0].message });
//     }
//     if (!verified) {
//       res
//         .status(401)
//         .json({ success: false, message: "This account is not verified." });
//     }
//     // If user is verified
//     const existingUser = await User.findOne({ _id: userId }).select(
//       "+password"
//     );

//     // Check if user with such credentials exist
//     if (!existingUser) {
//       res
//         .status(401)
//         .json({ success: false, message: "This user doesn't exist" });
//     }
//     // If user exist => check if old password exist/match
//     const results = await doHashing(oldPassword, existingUser.password);
//     if (!results) {
//       res.status(401).json({ success: false, message: "Invalid credentials" });
//     }

//     // if correct, now hash the new password
//     const hashedPw = await doHashing(newPAssword, 12);
//     // Now store the hatched password
//     existingUser.password = hashedPw;
//     await existingUser.save();
//     // After saving the user, send a response
//     res.status(200).json({
//       success: true,
//       message: "Password changed successfully.",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// // Forgot password -> send verification code to the user to their email
// exports.sendForgotPasswordCode = async (req, res) => {
//   // We need email from the user (form)
//   const { email } = req.body;
//   try {
//     //Check whether user exist
//     const existingUser = await User.findOne({ email });
//     if (!existingUser) {
//       res.status(404).json({ success: false, message: "User doesn't exist" });
//     }
//     // Generate a code to send to user
//     const codeValue = Math.floor(Math.random() * 1000000).toString();
//     let info = await transport.sendMail({
//       from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
//       to: existingUser.email,
//       subject: "Forgot password code",
//       html: "<h1>" + codeValue + "</h1>",
//     });

//     // if code accepted
//     if (info.accepted[0] === existingUser.email) {
//       // Has password before storing it
//       const hashedCodeValue = hmacCodeHashingProcess(
//         codeValue,
//         process.env.HMAC_VERIFICATION_CODE_SECRET
//       );
//       existingUser.forgotPasswordCode = hashedCodeValue;
//       existingUser.forgotPasswordCodeValidation = Date.now();
//       await existingUser.save();
//       return res.status(200).json({ success: true, message: "Code sent" });
//     }
//     /// TODO -> check whether supposed to return the response or not
//     return res
//       .status(400)
//       .json({ success: false, message: "Code sent failed" });
//   } catch (error) {
//     console.log(error);
//   }
// };

// // Now the user has the verification code and will enter it in Reset password form

// exports.verifyForgotPasswordCode = async (req, res) => {
//   // Get input fields from user i.e email, provided code and new password
//   const { email, providedCode, newPassword } = req.body;
//   try {
//     // Validate the input
//     const { error, value } = acceptedFPCodeSchema.validate({
//       email,
//       providedCode,
//       newPassword,
//     });
//     if (error) {
//       return res
//         .status(401)
//         .json({ success: false, message: error.details[0].message });
//     }
//     const codeValue = providedCode.toString();

//     //  Check whether user exist
//     const existingUser = await User.findOne({ email }).select(
//       "+forgotPasswordCode +forgotPasswordCodeValidation"
//     );

//     // User does not exist, send a error
//     if (!existingUser) {
//       return res
//         .status(401)
//         .json({ success: false, message: "User doesn't exist" });
//     }
//     if (
//       !existingUser.forgotPasswordCode ||
//       !existingUser.forgotPasswordCodeValidation
//     ) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Something is wrong with the code" });
//     }
//     // Check password code expire date
//     if (Date.now() - existingUser.verificationCodeValidation > 5 * 60 * 1000) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Code has expired." });
//     }
//     const hashedCodeValue = hmacCodeHashingProcess(
//       codeValue,
//       process.env.HMAC_VERIFICATION_CODE_SECRET
//     );
//     if (hashedCodeValue === existingUser.forgotPasswordCode) {
//       // hash the new password and store it -> over-write the old password
//       const hashedPassword = await doHashing(newPassword, 12);
//       existingUser.password = hashedPassword;
//       existingUser.forgotPasswordCode = undefined;
//       existingUser.forgotPasswordCodeValidation = undefined;
//       await existingUser.save();
//       return res
//         .status(200)
//         .json({ success: true, message: "Your password has been updated." });
//     }
//     return res
//       .status(400)
//       .json({ success: false, message: "Unexpected error occurred." });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({success:false, message:"Internal Server Error"})
//   }
// };
