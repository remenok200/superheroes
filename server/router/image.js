const imageRouter = require('express').Router({ mergeParams: true });

const ImageController = require('../controllers/imageController');

const { uploadImages } = require('../utils/fileUpload');

const { checkToken } = require('../middlewares/checkToken');

imageRouter
  .route('/')
  .get(checkToken, ImageController.getHeroImages)
  .post(checkToken, uploadImages, ImageController.addHeroImages);

// localhost:5000/api/superheroes/<heroId>/images/<imageId>
imageRouter
  .route('/:imageId')
  .get(checkToken, ImageController.getImage)
  .delete(checkToken, ImageController.deleteImage);

module.exports = imageRouter;
