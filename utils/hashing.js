// const { hash } = require("bcryptjs");
import {hash} from 'bcryptjs'


exports.doHashing = (value, saltValue) => {
  const results = hash(value, saltValue);
  return results;
};
