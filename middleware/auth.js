const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function(req, res, next) {
  // Get the Token from the header
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({
      message: 'No token, authorization denied'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid token'
    });
  }
};
