const joi = require("joi");

// Create a validation scheme to validate input

exports.signupSchema = joi.object({
  username: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')).required()
    .messages({
      'string.pattern.base': 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
    })
});

exports.loginSchema = joi.object({
  email: joi.string().min(5).max(60).required().email(),
  password: joi
    .string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
    .required(),
});

exports.acceptedCodeSchema = joi.object({
  providedCode: joi.number().required(),
  email: joi.string().min(5).max(60).email().required(),
});

exports.changePasswordSchema = joi.object({
  oldPassword: joi
    .string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
    .required(),
  newPassword: joi
    .string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
    .required(),
});

//forgot password
exports.acceptedFPCodeSchema = joi.object({
  providedCode: joi.number().required(),
  email: joi.string().min(5).max(60).email().required(),
  newPassword: joi
    .string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
    .required(),
});


// Incident schema

exports.incidentSchema = joi.object({
    user_id: joi.number().integer().required(),
    category: joi.string().max(255).required(),
    description: joi.string().max(1000).required(),
    media_url: joi.string().uri().optional(),
    location: joi.string().max(255).required()
});

exports.statusSchema = joi.object({
    status: joi.string().valid('Submitted', 'Pending', 'Resolved').required()
});