const jwt = require('jsonwebtoken');
const Controller = require('./controllers');

module.exports = {
  validateBody: function(req, res, next) {
    let { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Missing required fields username or password" });
    }
    
    req.user = req.body;
    next();
  }
}