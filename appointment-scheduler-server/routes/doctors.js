const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctors");

// interacting with doctor model
// get the list of doctors
router.get("/", async (req, res, next) => {
  try {
    const getDoctors = await Doctor.fetchAllDoctors();
    return res.status(200).json({ getDoctors });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
