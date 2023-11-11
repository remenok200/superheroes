const { Superhero, SuperPower, Image } = require('../models');
const createHttpError = require('http-errors');
const { deleteImage, generateRandomHero } = require('../utils');

module.exports.createHero = async (req, res, next) => {
  try {
    const { body, files } = req;

    const hero = await Superhero.create(body);

    if (files?.length) {
      const images = files.map((file) => ({
        path: file.filename,
        heroId: hero.id,
      }));

      await Image.bulkCreate(images, {
        returning: true,
      });
    }

    if (body?.superPowers?.length) {
      const powers = body.superPowers.map((power) => ({
        name: power,
        heroId: hero.id,
      }));

      await SuperPower.bulkCreate(powers, {
        returning: true,
      });
    }

    const heroWithData = await Superhero.findAll({
      where: {
        id: hero.id,
      },
      include: [
        {
          model: SuperPower,
          attributes: ['id', 'name'],
          as: 'superPowers',
        },
        {
          model: Image,
          attributes: ['id', 'path'],
          as: 'images',
        },
      ],
    });

    return res.status(201).send({ data: heroWithData });
  } catch (error) {
    next(error);
  }
};

module.exports.getHeroes = async (req, res, next) => {
  try {
    const { pagination } = req;

    const heroes = await Superhero.findAll({
      include: [
        {
          model: SuperPower,
          attributes: ['id', 'name'],
          as: 'superPowers',
        },
        {
          model: Image,
          attributes: ['id', 'path'],
          as: 'images',
        },
      ],
      order: [['updated_at', 'DESC']],
      ...pagination,
    });

    const totalHeroesCount = await Superhero.count();

    return res.send({ data: heroes, totalHeroesCount });
  } catch (error) {
    next(error);
  }
};

module.exports.getHeroById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const hero = await Superhero.findByPk(id, {
      include: [
        {
          model: SuperPower,
          attributes: ['id', 'name'],
          as: 'superPowers',
        },
        {
          model: Image,
          attributes: ['id', 'path'],
          as: 'images',
        },
      ],
    });

    if (!hero) {
      return next(createHttpError(404));
    }

    return res.status(200).send({ data: hero });
  } catch (error) {
    next(error);
  }
};

module.exports.updateHeroById = async (req, res, next) => {
  try {
    const {
      params: { id },
      body: { files },
      body,
    } = req;

    const [count, [updatedHero]] = await Superhero.update(body, {
      where: {
        id,
      },
      returning: true,
    });

    if (files?.length) {
      const images = files.map((file) => ({
        path: file.filename,
        heroId: hero.id,
      }));

      await Image.bulkCreate(images, {
        returning: true,
      });
    }

    if (body?.superPowers?.length) {
      const powers = body.superPowers.map((power) => ({
        name: power,
        heroId: hero.id,
      }));

      await SuperPower.bulkCreate(powers, {
        returning: true,
      });
    }

    if (count === 0) {
      return next(createHttpError(404));
    }

    const heroWithData = await Superhero.findAll({
      where: {
        id: updatedHero.id,
      },
      include: [
        {
          model: SuperPower,
          attributes: ['id', 'name'],
          as: 'superPowers',
        },
        {
          model: Image,
          attributes: ['id', 'path'],
          as: 'images',
        },
      ],
    });

    return res.status(200).send({ data: heroWithData });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteHeroById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const hero = await Superhero.findByPk(id, {
      include: [
        {
          model: Image,
          attributes: ['id', 'path'],
          as: 'images',
        },
      ],
    });

    if (!hero) {
      return next(createHttpError(404));
    }

    if (hero.images.length) {
      for (let i = 0; i < hero.images.length; i++) {
        const imagePath = hero.images[i].path;
        await deleteImage(imagePath);
      }
    }

    hero.destroy();

    return res.status(200).send({ data: hero });
  } catch (error) {
    next(error);
  }
};

module.exports.createRandomHero = async (req, res, next) => {
  try {
    const heroData = await generateRandomHero(); // получаем объект героя из generateRandomHero()

    // создаем супергероя
    const hero = await Superhero.create({
      nickname: heroData.nickname,
      realName: heroData.realName,
      originDescription: heroData.originDescription,
      catchPhrase: heroData.catchPhrase,
    });

    // создаем суперсилы для героя
    const powers = heroData.superPowers.map((power) => ({
      name: power,
      heroId: hero.id,
    }));
    await SuperPower.bulkCreate(powers, { returning: true });

    // создаем картинки для героя
    const images = heroData.images.map((imagePath) => ({
      path: imagePath,
      heroId: hero.id,
    }));
    await Image.bulkCreate(images, { returning: true });

    // находим созданного супергероя и связанные с ним данные
    const heroWithData = await Superhero.findByPk(hero.id, {
      include: [
        {
          model: SuperPower,
          attributes: ['id', 'name'],
          as: 'superPowers',
        },
        {
          model: Image,
          attributes: ['id', 'path'],
          as: 'images',
        },
      ],
    });

    // отправляем созданного супергероя и связанные с ним данные в ответе
    res.status(201).send({ data: heroWithData });
  } catch (err) {
    next(err);
  }
};
