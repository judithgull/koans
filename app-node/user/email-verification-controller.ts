// var jwt = require("jwt-simple");

var mailgun = require("mailgun-js")(
  {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
);

export var send = (callback:Function) => {
  var data = {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: "I love Code E-mail Verification",
    text: "Testing some Mailgun awesomness!"
  };

  mailgun.messages().send(data, callback);
  return true;
};



