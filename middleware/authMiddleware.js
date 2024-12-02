const { apiauthkey } = require('./authkey');

module.exports = (req, res, next) => {
  const apiKey = req.header('apiauthkey');
  if (!apiKey) {
    return res.status(401).json({ message: 'Access denied, apiauthkey is missing' });
  }
  if (apiKey !== apiauthkey) {
    return res.status(401).json({ message: 'Failed to authenticate apiauthkey' });
  }
  next();
};
