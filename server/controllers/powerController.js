const { SuperPower } = require('../models');
const createHttpError = require('http-errors');

module.exports.getHeroPowers = async (req, res, next) => {
  try {
    const {
      params: { heroId },
    } = req;

    const powers = await SuperPower.findAll({
      heroId,
    });

    return res.send({ data: powers });
  } catch (error) {
    next(error);
  }
};

module.exports.addHeroPowers = async (req, res, next) => {
  try {
    const {
      params: { heroId },
      body, // body -> powers -> ['Fly', 'Invisibility']
    } = req;

    const powers = body.powers.map((name) => ({ name, heroId }));

    const createdPowers = await SuperPower.bulkCreate(powers);

    if (!createdPowers) {
      return next(createHttpError(400));
    }

    return res.send({ data: createdPowers });
  } catch (error) {
    next(error);
  }
};

module.exports.deletePower = async (req, res, next) => {
  try {
    const {
      params: { heroId, powerId },
    } = req;

    const count = await SuperPower.destroy({
      where: { heroId, id: powerId },
    });

    if(count === 0) {
      return next(createHttpError(404));
    }

    return res.status(200).end();
  } catch (error) {
    next(error);
  }
};
