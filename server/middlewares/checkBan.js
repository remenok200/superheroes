const createHttpError = require('http-errors');
const { Banlist } = require('../models/MongoDB');

module.exports.checkBan = async (req, res, next) => {
  try {
    const {tokenPayload: {userId}} = req;

    const banned = await Banlist.findOne({userId});

    if(banned) {
      next(createHttpError(406, 'You are banned!'))
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}