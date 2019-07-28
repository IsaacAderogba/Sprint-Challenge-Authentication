const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: function({ id, username }) {
    const payload = {
      sub: id,
      username
    };

    const options = {
      expiresIn: "1d"
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }
};
