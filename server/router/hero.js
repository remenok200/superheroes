const heroRouter = require('express').Router();

const imageRouter = require('./image');
const powerRouter = require('./powers');

const HeroController = require('../controllers/heroController');

const { uploadImages } = require('../utils/fileUpload');

const paginate = require('../middlewares/paginate');

const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkBan } = require('../middlewares/checkBan');

heroRouter
  .route('/')
  .get(checkToken, checkBan, paginate, HeroController.getHeroes)
  .post(checkToken, checkBan, checkAdmin, uploadImages, HeroController.createHero);

heroRouter
  .route('/:id')
  .get(checkToken, checkBan, HeroController.getHeroById)
  .put(checkToken, checkBan, checkAdmin, uploadImages, HeroController.updateHeroById)
  .delete(checkToken, checkBan, checkAdmin, HeroController.deleteHeroById);

heroRouter
  .route('/random')
  .post(checkToken, checkBan, checkAdmin, HeroController.createRandomHero);

// localhost:5000/api/superheroes/<heroId>/images
heroRouter.use('/:heroId/images', imageRouter);
// localhost:5000/api/superheroes/<heroId>/powers
heroRouter.use('/:heroId/powers', powerRouter);

module.exports = heroRouter;
