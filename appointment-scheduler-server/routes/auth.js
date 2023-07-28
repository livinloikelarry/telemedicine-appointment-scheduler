/** Routes for authentication. */

const express = require("express");
const router = express.Router();

router.post("/login", async function (req, res, next) {
  try {
    // taker user email and password and try to authenticate
    const user = await User.authenticate(req.body);
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async function (req, res, next) {
  try {
    // create a new user in the db
    const user = await User.register(req.body);
    return res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
