/** Routes for authentication. */

const express = require("express");
const router = express.Router();
const User = require("../models/users");
const { makePublicUser } = require("../models/users");
const security = require("../middleware/security");
const { createUserJwt } = require("../utils/tokens");

router.post("/login", async function (req, res, next) {
  try {
    // taker user email and password and try to authenticate
    const user = await User.login(req.body);
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    // create a new user in our db. first, last, email, pw
    const user = await User.register(req.body);
    const token = createUserJwt(user);
    return res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
});

router.post("/test", async (req, res, next) => {
  return res.status(201).jsong("u did it");
});

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const user = await User.fetchUserByEmail(email);
    const publicUser = makePublicUser(user);
    return res.status(200).json({ user: publicUser });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
