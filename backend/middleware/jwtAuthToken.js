const jwt = require("jsonwebtoken");

const tokenAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, "My_Secret", (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

module.exports = tokenAuth;
