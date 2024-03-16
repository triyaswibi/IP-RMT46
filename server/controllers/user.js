const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

module.exports = class userController {
  static async registerUser(req, res, next) {
    try {
      const { fullName, email, password, phoneNumber, address } = req.body;
      const user = await User.create({
        fullName,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        address: user.address,
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email)
        throw {
          name: "customeError",
          status: 400,
          message: "email is required",
        };
      if (!password)
        throw {
          name: "customeError",
          status: 400,
          message: "password is required",
        };

      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user || !comparePassword(password, user.password))
        throw {
          name: "customeError",
          status: 400,
          message: "invalid email/password",
        };

      res.status(200).json({ access_token: signToken({ id: user.id }) });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    const { googleToken } = req.body;
    try {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience:
          "414733913348-jgbp1cosinenhu9bknunn84ftilpsvmp.apps.googleusercontent.com",
      });
      const { email, fullName } = ticket.getPayload();
      const password = Math.random().toString();
      const [user] = await User.findOrCreate({
        where: { email },
        defaults: {
          fullName,
          email,
          password,
        },
      });

      const access_token = signToken({ id: user.id });
      res
        .status(200)
        .json({ message: "Logged in as " + user.email, access_token });
    } catch (error) {
      next(error);
    }
  }
};
