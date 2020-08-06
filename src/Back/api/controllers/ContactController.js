require("dotenv").config();
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox0e9d49063b8f4bc4ad0e48a040cad4b5.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });

const sendContactMessage = (req, res) => {
  const { message, email, subject } = req.body;

  const data = {
    from: `${email}`,
    to: `hyf.team.lightz@gmail.com`,
    subject: `${subject}`,
    text: `${message}`,
  };
  mg.messages().send(data, function (error, body) {
    if (error) {
      return res.json({
        message: error.message,
      });
    }

    return res.json({
      message: "email has been send, thank you for your message",
    });
  });
};

module.exports = {
  sendContactMessage,
};
