const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Controller = require('./controllers');
const mdlware = require('./middleware');
const helpers = require("./helpers");

router.post("/register", mdlware.validateBody, async (req, res, next) => {
  const hash = bcrypt.hashSync(req.user.password, 12);
  req.user.password = hash;

  try {
    const registeredUser = await Controller.postUser(req.user);
    
    if (registeredUser) {
      const token = helpers.generateToken(registeredUser);
      res.status(201).json({ registeredUser, token });
    } else {
      res.status(400).json({ message: "User could not be created"});
    }
  } catch (err) {
    next(err);
  }
});