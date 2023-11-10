const powerRouter = require('express').Router({ mergeParams: true });

const PowerController = require('../controllers/powerController');

const { checkToken } = require('../middlewares/checkToken');

powerRouter
  .route('/')
  .get(checkToken, PowerController.getHeroPowers)
  .post(checkToken, PowerController.addHeroPowers);

// localhost:5000/api/superheroes/<heroId>/powers/<powerId>
powerRouter
.route('/:powerId')
.delete(checkToken, PowerController.deletePower);

module.exports = powerRouter;
