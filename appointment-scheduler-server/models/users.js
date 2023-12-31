const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
  static makePublicUser(user) {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      doctor: user.doctor,
    };
  }
  // these methods are all hitting postgres / using the database
  static async login(credentials) {
    console.log(credentials);
    const requiredFields = ["email", "password"];
    requiredFields.forEach((property) => {
      if (!credentials.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`);
      }
    });

    const user = await User.fetchUserByEmail(credentials.email);
    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (isValid) {
        return User.makePublicUser(user);
      }
    }

    throw new UnauthorizedError("Invalid email/password");
  }

  static async register(credentials) {
    console.log(credentials);
    // create a new user in the db with all of their info and return the user
    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "password",
      "doctor",
    ];
    requiredFields.forEach((property) => {
      if (!credentials.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`);
      }
    });

    // check to see if valid email was given
    if (credentials.email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.");
    }

    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError(
        `A user already exists with email: ${credentials.email}`
      );
    }

    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );
    const normalizedEmail = credentials.email.toLowerCase();

    const userResult = await db.query(
      `INSERT INTO users (first_name, last_name, email, password, doctor)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, first_name, last_name, email, doctor;
      `,
      [
        credentials.first_name,
        credentials.last_name,
        normalizedEmail,
        hashedPassword,
        credentials.doctor,
      ]
    );
    const user = userResult.rows[0];
    return User.makePublicUser(user);
  }
  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }

    const query = `SELECT * FROM users WHERE email = $1`;

    const result = await db.query(query, [email.toLowerCase()]);

    const user = result.rows[0];

    return user;
  }
}
module.exports = User;
