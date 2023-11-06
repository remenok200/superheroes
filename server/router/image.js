const imageRouter = require('express').Router({ mergeParams: true });

const ImageController = require('../controllers/imageController');

const { uploadImages } = require('../utils/fileUpload');

imageRouter
  .route('/')
  .get(ImageController.getHeroImages)
  .post(uploadImages, ImageController.addHeroImages);

// localhost:5000/api/superheroes/<heroId>/images/<imageId>
imageRouter
  .route(':imageId')
  .get(ImageController.getImage)
  .delete(ImageController.deleteImage);

module.exports = imageRouter;
