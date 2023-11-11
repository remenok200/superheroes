const powerRouter = require('express').Router({ mergeParams: true });

const PowerController = require('../controllers/powerController');

const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');

powerRouter
  .route('/')
  .get(checkToken, PowerController.getHeroPowers)
  .post(checkToken, checkAdmin, PowerController.addHeroPowers);

// localhost:5000/api/superheroes/<heroId>/powers/<powerId>
powerRouter
.route('/:powerId')
.delete(checkToken, checkAdmin, PowerController.deletePower);

module.exports = powerRouter;
