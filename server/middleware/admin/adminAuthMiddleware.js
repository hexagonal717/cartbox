const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY, (err, user) => {
      if (err) return res.status(401).json({ message: 'Token not valid.' });
      if (user.id === req.params.id) {
        next();
      } else {
        return res.status(401).json({ message: 'User and Token not match.' });
      }
    });
  } else {
    return res.status(401).json({ message: 'No token provided.' });
  }
};

module.exports = { verifyToken };
