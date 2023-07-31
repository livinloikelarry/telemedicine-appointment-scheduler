const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Doctor {
  //  FETCH ALL doctors
  static async fetchAllDoctors() {
    // implement logic to display registered doctors
    return results.rows;
  }
}

module.exports = Doctor;
