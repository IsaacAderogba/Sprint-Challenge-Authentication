const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Controller = require("./controllers");
const mdlware = require("./middleware");
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
      res.status(400).json({ message: "User could not be created" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/login", mdlware.validateBody, async (req, res, next) => {
  try {
    const user = await Controller.getUserByFilter({
      username: req.user.username
    });
    if (user && bcrypt.compareSync(req.user.password, user.password)) {
      const token = helpers.generateToken(user);
      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ message: "User and password not authorized " });
    }
  } catch (err) {
    next(err);
  }
});
