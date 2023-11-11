const userRouter = require('express').Router();

const UserController = require('../controllers/userController');
const BanlistController = require('../controllers/banController');

const { hashPass } = require('../middlewares/hashPassword');
const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkBan } = require('../middlewares/checkBan');

userRouter
.route('/sign-up')
.post(hashPass, UserController.registrationUser);

userRouter
.route('/sign-in')
.post(UserController.loginUser);

userRouter
.route('/')
.get(checkToken, UserController.checkAuth);

userRouter
.route('/refresh')
.post(UserController.refreshSession);

userRouter
.route('/banlist')
.post(checkToken, checkAdmin, BanlistController.ban);

userRouter
.route('/banlist-unban')
.post(checkToken, checkAdmin, BanlistController.unban);

userRouter
.route('/all')
.get(checkToken, checkBan, checkAdmin, UserController.getAllUsers);

userRouter
.route('/invalid-tokens')
.delete(checkToken, checkBan, checkAdmin, UserController.deleteAllInvalidRefreshTokens);

module.exports = userRouter;
