const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Doctor {
  //  FETCH ALL doctors
  static async fetchAllDoctors() {
    const results = await db.query(
      `
        SELECT u.id,
                u.first_name,
                u.last_name
        FROM users AS u
            WHERE u.is_doctor = true
        `
    );
    return results.rows;
  }
}

module.exports = Doctor;
