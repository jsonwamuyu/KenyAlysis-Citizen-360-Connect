import { compare, hash } from "bcryptjs";
import createHmac from "crypto";

exports.doHashing = (value, saltValue) => {
  const results = hash(value, saltValue);
  return results;
};

exports.comparePasswords = (value, hashed) => {
  const results = compare(value, hashedPassword);
  return results;
};

exports.hmacCodeHashingProcess = (value, key) => {
  const results = createHmac("sha256", key).update(value).digest("hex");
  return results;
};
