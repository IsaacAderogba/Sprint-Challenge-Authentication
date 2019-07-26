/* eslint-disable require-atomic-updates */
const jwt = require("jsonwebtoken");
const Controller = require("./controllers");

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
  },
  validateId: async function(req, res, next) {
    const { id } = req.params;

    if (Number.isInteger(parseInt(id, 10))) {
      try {
        const user = await Controller.getUserById(id);

        if (user) {
          req.user = user;
          next();
        } else {
          res
            .status(404)
            .json({ message: `The user with Id of '${id}' does not exist` });
        }
      } catch (err) {
        next(err);
      }
    } else {
      res.status(400).json({ message: `The Id of '${id}' is not valid` });
    }
  },
  authenticateUser: function(req, res, next) {
    const token = req.get("Authorization");

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json(err);

        req.decodedToken = decoded;

        next();
      });
    } else {
      return res.status(401).json({
        error: "No token provided, must be set on the Authorization Header"
      });
    }
  }
};
