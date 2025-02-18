const { hash } = require("bcryptjs");


exports.doHashing = (value, saltValue) => {
  const results = hash(value, saltValue);
  return results;
};
