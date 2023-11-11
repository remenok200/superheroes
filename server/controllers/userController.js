const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const { User, RefreshToken, Banlist } = require('../models/MongoDB');
const {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require('../services/tokenService');

module.exports.registrationUser = async (req, res, next) => {
  try {
    const { body, passwordHash } = req;

    const createdUser = await User.create({ ...body, passwordHash });

    const accessToken = await createAccessToken({
      userId: createdUser._id,
      email: createdUser.email,
      role: createdUser.role,
    });
    const refreshToken = await createRefreshToken({
      userId: createdUser._id,
      email: createdUser.email,
      role: createdUser.role,
    });

    await RefreshToken.create({
      token: refreshToken,
      userId: createdUser._id,
      geolocation: body.geolocation,
    });

    return res
      .status(201)
      .send({ data: createdUser, tokens: { accessToken, refreshToken } });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const { body } = req;

    const foundUser = await User.findOne({
      email: body.email,
    });

    if (foundUser) {
      const result = await bcrypt.compare(
        body.password,
        foundUser.passwordHash
      );
      if (!result) {
        return next(createHttpError(404, 'Incorrect email or password'));
      }

      const accessToken = await createAccessToken({
        userId: foundUser._id,
        email: foundUser.email,
        role: foundUser.role,
      });
      const refreshToken = await createRefreshToken({
        userId: foundUser._id,
        email: foundUser.email,
        role: foundUser.role,
      });

      await RefreshToken.create({
        token: refreshToken,
        userId: foundUser._id,
        geolocation: body.geolocation,
      });

      return res
        .status(200)
        .send({ data: foundUser, tokens: { accessToken, refreshToken } });
    }
    return next(createHttpError(404, 'Incorrect email or password'));
  } catch (error) {
    next(error);
  }
};

module.exports.checkAuth = async (req, res, next) => {
  try {
    const {
      tokenPayload: { email },
    } = req;

    const foundUser = await User.findOne({
      email,
    });

    return res.status(200).send({ data: foundUser });
  } catch (error) {
    next(error);
  }
};

module.exports.refreshSession = async (req, res, next) => {
  const {
    body: { refreshToken, geolocation },
  } = req;
  let verifyResult;

  try {
    verifyResult = await verifyRefreshToken(refreshToken);
  } catch (error) {
    next(createHttpError(401, 'Invalid refresh token'));
  }
  try {
    if (verifyResult) {
      const foundUser = await User.findOne({
        email: verifyResult.email,
      });

      const rTFromDB = await RefreshToken.findOne({
        $and: [{ token: refreshToken }, { userId: foundUser._id }],
      });

      if (rTFromDB) {
        await RefreshToken.deleteOne({
          $and: [{ token: refreshToken }, { userId: foundUser._id }],
        });

        const newAccessToken = await createAccessToken({
          userId: foundUser._id,
          email: foundUser.email,
          role: foundUser.role,
        });
        const newRefreshToken = await createRefreshToken({
          userId: foundUser._id,
          email: foundUser.email,
          role: foundUser.role,
        });

        await RefreshToken.create({
          token: newRefreshToken,
          userId: foundUser._id,
          geolocation,
        });

        return res.status(200).send({
          tokens: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
        });
      } else {
        next(createHttpError(401, 'Invalid refresh token'));
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();

    const usersWithBans = [];

    for (let user of allUsers) {
      const ban = await Banlist.findOne({ userId: user._id });

      const userInfo = {
        user,
        banInfo: ban,
      };

      usersWithBans.push(userInfo);
    }

    return res.status(200).send({ data: usersWithBans });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteAllInvalidRefreshTokens = async (req, res, next) => {
  try {
    const allTokens = await RefreshToken.find();

    const invalidTokens = [];

    for (let token of allTokens) {
      try {
        await verifyRefreshToken(token.token);
      } catch (error) {
        invalidTokens.push(token._id);
      }
    }

    if (invalidTokens.length > 0) {
      await RefreshToken.deleteMany({ _id: { $in: invalidTokens } });
    }

    return res.status(200).send('Invalid tokens deleted successfully');
  } catch (error) {
    next(error);
  }
};
