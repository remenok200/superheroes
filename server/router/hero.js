const heroRouter = require('express').Router();

const imageRouter = require('./image');
const powerRouter = require('./powers');

const HeroController = require('../controllers/heroController');

const { uploadImages } = require('../utils/fileUpload');

const paginate = require('../middlewares/paginate');

const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');

heroRouter
  .route('/')
  .get(checkToken, paginate, HeroController.getHeroes)
  .post(checkToken, checkAdmin, uploadImages, HeroController.createHero);

heroRouter
  .route('/:id')
  .get(checkToken, HeroController.getHeroById)
  .put(checkToken, checkAdmin, uploadImages, HeroController.updateHeroById)
  .delete(checkToken, checkAdmin, HeroController.deleteHeroById);

// localhost:5000/api/superheroes/<heroId>/images
heroRouter.use('/:heroId/images', imageRouter);
// localhost:5000/api/superheroes/<heroId>/powers
heroRouter.use('/:heroId/powers', powerRouter);

module.exports = heroRouter;
