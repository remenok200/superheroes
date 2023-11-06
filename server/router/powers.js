const powerRouter = require('express').Router({ mergeParams: true });

const PowerController = require('../controllers/powerController');

powerRouter
  .route('/')
  .get(PowerController.getHeroPowers)
  .post(PowerController.addHeroPowers);

// localhost:5000/api/superheroes/<heroId>/powers/<powerId>
powerRouter.route('/:powerId').delete(PowerController.deletePower);

module.exports = powerRouter;
