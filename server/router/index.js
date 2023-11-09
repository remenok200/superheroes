const router = require('express').Router();
const heroRouter = require('./hero');
const userRouter = require('./user');

router.use('/superheroes', heroRouter);
router.use('/users', userRouter);

module.exports = router;