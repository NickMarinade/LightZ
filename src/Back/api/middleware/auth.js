const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "A785$%&&/_tu%");

    req.user = decode;
    next();
  } catch (error) {
    res.json({
      message: "Authentication failed",
    });
  }
};

module.exports = authenticate;
