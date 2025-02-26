const { compare, hash } = require("bcryptjs");
const crypto = require("crypto");

exports.doHashing = async (value, saltValue) => {
  return await hash(value, saltValue);
};

exports.comparePasswords = async (value, hashedPassword) => {
  return await compare(value, hashedPassword);
};

exports.hmacCodeHashingProcess = (value, key) => {
  return crypto.createHmac("sha256", key).update(value).digest("hex");
};
