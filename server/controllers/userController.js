const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const { User } = require('../models/MongoDB');

module.exports.registrationUser = async (req, res, next) => {
  try {
    const { body, passwordHash } = req;

    const createdUser = await User.create({ ...body, passwordHash });

    return res.status(201).send({ data: createdUser });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const { body } = req;

    const foundUser = await User.findOne({
      email: body.email,
    });

    if (foundUser) {
      const result = await bcrypt.compare(
        body.password,
        foundUser.passwordHash
      );
      if (!result) {
        return next(createHttpError(404));
      }
      return res.status(200).send({ data: foundUser });
    }
    return next(createHttpError(404));
  } catch (error) {
    next(error);
  }
};
