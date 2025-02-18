const joi = require("joi");

// Create a validation scheme to validate input

exports.signupSchema = joi.object({
  email: joi
    .string()
    .min(5)
    .max(60)
    .required()
    .email({ tlds: { allow: ["com", "net"] } }),
  password: joi
    .string()
    .required()
    .min(8)
    .pattern(new RegExp("^(?*.*[a-z])(?*.*[A-Z])(?.*d).{&,}$")),// TODO: change this pattern
});

exports.loginSchema = joi.object({
  email: joi
    .string()
    .min(5)
    .max(60)
    .required()
    .email({ tlds: { allow: ["com", "net"] } }),
  password: joi
    .string()
    .min(8)
    .pattern(new RegExp("^(?*.*[a-z])(?*.*[A-Z])(?.*d).{&,}$"))
    .required(),
});
