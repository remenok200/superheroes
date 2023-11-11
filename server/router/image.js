const imageRouter = require('express').Router({ mergeParams: true });

const ImageController = require('../controllers/imageController');

const { uploadImages } = require('../utils/fileUpload');

const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkBan } = require('../middlewares/checkBan');

imageRouter
  .route('/')
  .get(checkToken, checkBan, ImageController.getHeroImages)
  .post(checkToken, checkBan, checkAdmin, uploadImages, ImageController.addHeroImages);

// localhost:5000/api/superheroes/<heroId>/images/<imageId>
imageRouter
  .route('/:imageId')
  .get(checkToken, checkBan, ImageController.getImage)
  .delete(checkToken, checkBan, checkAdmin, ImageController.deleteImage);

module.exports = imageRouter;
