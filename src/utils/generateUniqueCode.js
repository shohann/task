const crypto = require('crypto');

module.exports.generateUniqueCode = () => {
  const randomBytes = crypto.randomBytes(4); // Generate 4 random bytes
  const code = randomBytes.toString('hex').toUpperCase().slice(0, 8);
  return code;
}
