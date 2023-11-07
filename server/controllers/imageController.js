const { Image } = require('../models');
const createHttpError = require('http-errors');

module.exports.getHeroImages = async (req, res, next) => {
  try {
    const {
      params: { heroId },
    } = req;

    const images = await Image.findAll({
      where: { heroId },
    });

    return res.status(200).send({ data: images });
  } catch (error) {
    next(error);
  }
};

module.exports.addHeroImages = async (req, res, next) => {
  try {
    const {
      params: { heroId },
      files,
    } = req;

    const images = files.map((file) => ({ path: file.filename, heroId }));
    const addedImages = await Image.bulkCreate(images, { returning: true });

    return res.status(201).send({ data: addedImages });
  } catch (error) {
    next(error);
  }
};

module.exports.getImage = async (req, res, next) => {
  try {
    const {
      params: { heroId, imageId },
    } = req;

    const image = await Image.findOne({
      where: { heroId, id: imageId },
    });

    if (!image) {
      return next(createHttpError(404));
    }

    return res.status(200).send({ data: image });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteImage = async (req, res, next) => {
  try {
    const {
      params: { heroId, imageId },
    } = req;

    const count = await Image.destroy({
      where: {
        heroId,
        id: imageId,
      },
    });

    if (count === 0) {
      return next(createHttpError(404));
    }

    return res.status(200).end();
  } catch (error) {
    next(error);
  }
};
