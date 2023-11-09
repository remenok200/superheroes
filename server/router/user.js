const userRouter = require('express').Router();
const UserController = require('../controllers/userController');
const { hashPass } = require('../middlewares/hashPassword');

userRouter
  .route('/sign-up')
  .post(hashPass, UserController.registrationUser);

userRouter.route('/sign-in').post(UserController.loginUser);

module.exports = userRouter;
