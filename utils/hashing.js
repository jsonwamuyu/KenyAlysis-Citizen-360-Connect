// const { hash } = require("bcryptjs");
import { compare, hash } from "bcryptjs";

exports.doHashing = (value, saltValue) => {
  const results = hash(value, saltValue);
  return results;
};

exports.comparePasswords = (value, hashed) => {
  const results = compare(value, hashedPassword);
  return results;
};
