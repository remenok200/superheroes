const imageRouter = require('express').Router({ mergeParams: true });

const ImageController = require('../controllers/imageController');

const { uploadImages } = require('../utils/fileUpload');

const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');

imageRouter
  .route('/')
  .get(checkToken, ImageController.getHeroImages)
  .post(checkToken, checkAdmin, uploadImages, ImageController.addHeroImages);

// localhost:5000/api/superheroes/<heroId>/images/<imageId>
imageRouter
  .route('/:imageId')
  .get(checkToken, ImageController.getImage)
  .delete(checkToken, checkAdmin, ImageController.deleteImage);

module.exports = imageRouter;
