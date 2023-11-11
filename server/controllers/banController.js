const createHttpError = require('http-errors');
const { User, Banlist } = require('../models/MongoDB');

module.exports.ban = async (req, res, next) => {
  try {
    const {
      tokenPayload: { userId: adminId },
    } = req;

    const {
      body: { userId, reason },
    } = req;

    const foundUser = await User.findOne({
      _id: userId,
    });

    if (foundUser) {
      const existingBan = await Banlist.findOne({ userId });

      if (existingBan) {
        next(createHttpError(400, 'User is already banned'));
      }

      const banned = await Banlist.create({ adminId, userId, reason });

      return res.status(200).send({ data: banned });
    } else {
      next(createHttpError(404, 'User not found'));
    }
  } catch (error) {
    next(error);
  }
};

module.exports.unban = async (req, res, next) => {
  try {
    const {
      tokenPayload: { userId: adminId },
    } = req;

    const {
      body: { userId },
    } = req;

    const result = await Banlist.deleteOne({ adminId, userId });

    if (result.deletedCount > 0) {
      return res.status(200).send('User unbanned successfully');
    } else {
      next(createHttpError(404, 'User not found'));
    }
  } catch (error) {
    next(error);
  }
};
