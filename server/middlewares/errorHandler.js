const { TokenExpiredError, JsonWebTokenError } = require('jsonwebtoken');

module.exports = async (err, req, res, next) => {
  console.log(err);
  
  if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
    return res.status(403).send('Invalid access token');
  }

  const code = err.status || 500;
  return res.status(code).send(err.message);
};
