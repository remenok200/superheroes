const powerRouter = require('express').Router({ mergeParams: true });

const PowerController = require('../controllers/powerController');

const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkBan } = require('../middlewares/checkBan');

powerRouter
  .route('/')
  .get(checkToken, checkBan, PowerController.getHeroPowers)
  .post(checkToken, checkBan, checkAdmin, PowerController.addHeroPowers);

// localhost:5000/api/superheroes/<heroId>/powers/<powerId>
powerRouter
.route('/:powerId')
.delete(checkToken, checkBan, checkAdmin, PowerController.deletePower);

module.exports = powerRouter;
