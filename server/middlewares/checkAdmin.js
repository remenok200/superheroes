const createHttpError = require('http-errors');
const { ROLE_ADMIN } = require('../constants');

module.exports.checkAdmin = async (req, res, next) => {
  try {
    const {
      tokenPayload: { role: roleFromToken },
    } = req;

    if (roleFromToken === ROLE_ADMIN) {
      next();
    } else {
      next(createHttpError(400, 'Access denied: You aren`t admin'));
    }
  } catch (error) {
    next(error);
  }
};
