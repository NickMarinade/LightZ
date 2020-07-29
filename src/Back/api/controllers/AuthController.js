const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { use } = require("../routes/auth");

const register = async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async function (err, hashedPass) {
      if (err) {
        res.json({
          error: err,
        });
      }

      let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
      });

      await user.save();
      res.json({
        message: "User added successfully",
      });
    });
  } catch (error) {
    res.json({
      message: "An error ocurred",
    });
  }
};

const login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({
    $or: [{ email: username }, { name: username }],
  });
  if (user) {
    bcrypt.compare(password, user.password, function (error, result) {
      if (error) {
        res.json({
          error: error,
        });
      }

      if (result) {
        let token = jwt.sign({ name: user.name }, "A785$%&&/_tu%", {
          expiresIn: "1h",
        });
        res.json({
          message: "Login successfull",
          token,
        });
      } else {
        res.json({
          message: "Password does not match",
        });
      }
    });
  } else {
    res.json({
      message: "No user found",
    });
  }
};

module.exports = {
  register,
  login,
};
