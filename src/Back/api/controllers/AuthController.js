const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
require("dotenv").config();
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox0e9d49063b8f4bc4ad0e48a040cad4b5.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });
// const { use } = require("../routes/auth");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 10, async function (err, hashedPass) {
      if (err) {
        res.json({
          error: err,
        });
      }

      let user = new User({
        name,
        email,
        password: hashedPass,
      });

      const token = jwt.sign(
        { name, email, password },
        process.env.JWT_ACC_ACTIVATE,
        { expiresIn: "20m" }
      );

      //email sent to user
      const data = {
        from: "Ligthz@teamapp.com",
        to: `${email}`,
        subject: "Account activation link",
        html: `<h2>Please click on the link to activate your accout</h2>
        <p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>`,
      };
      mg.messages().send(data, function (error, body) {
        if (err) {
          return res.json({
            message: err.message,
          });
        }

        // return res.json({
        //   message: "email has been sendt, please activate your account",
        // });
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
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    $or: [{ email: email }, { name: email }],
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

// const activateAccount = (req, res) => {
//   const { token } = req.body;
//   jwt.verify(token, process.env.JWT_ACC_ACTIVATE, function (err, decodedToken) {
//     if (err) {
//       res.status(400).json({ error: "Incorrect or expired link" });
//     }

//     const { name, email, password } = decodedToken;
//   });
// };

const forgotPassword = (req, res) => {
  const { email } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "User with this email does not exists." });
    }

    const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: "20m",
    });

    const data = {
      from: "Ligthz@teamapp.com",
      to: `${email}`,
      subject: "Password reset",
      html: `<h2>Please click on the link to reset your password</h2>
              <p>${process.env.CLIENT_URL}/reset-password/${token}</p>`,
    };

    return user.updateOne({ resetLink: token }, function (err, success) {
      if (err) {
        return res.status(400).json({ error: "Reset link error" });
      } else {
        mg.messages().send(data, function (error, body) {
          if (error) {
            return res.json({
              message: error.message,
            });
          }

          return res.json({
            message: "email has been sendt, please reset your password",
          });
        });
      }
    });
  });
};

const resetPassword = (req, res) => {
  const resetLink = req.params.token;
  const { newPassword } = req.body;

  bcrypt.hash(newPassword, 10, async function (err, hashedPass) {
    if (err) {
      res.json({
        error: "This is an error",
      });
    }

    if (resetLink) {
      jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function (
        error,
        decodedData
      ) {
        if (error) {
          return res.status(401).json({ error: "Incorrect Token or expired" });
        }
        User.findOne({ resetLink }, function (err, user) {
          if (err || !user) {
            return res
              .status(400)
              .json({ error: "User with this token does not exists." });
          }

          const obj = {
            password: hashedPass,
          };

          user = _.extend(user, obj);
          user.save((err, result) => {
            if (err) {
              return res.status(400).json({ error: "reset password error" });
            } else {
              return res
                .status(200)
                .json({ message: "Your password has been changed" });
            }
          });
        });
      });
    } else {
      return res.status(401).json({ error: "Authentication error" });
    }
  });
};

module.exports = {
  register,
  login,
  // activateAccount,
  forgotPassword,
  resetPassword,
};
