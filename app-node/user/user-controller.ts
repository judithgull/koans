import url = require("url");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jwt-simple");
var User = require("./user-model.js");
var secret = 'veryBigSecret...';

export var postUser = (req, res) => {
  res.format({
    "application/json": function (req, res) {

      var body = req.body;
      console.log(body);

      bcrypt.hash(body.password, null, null, function(err, hash) {
        var user = new User();
        user.name = body.name;
        user.email = body.email;
        user.password = hash;

        user.save(function(err){
          if (err) {
            console.log(err);
            res.send(err);
          }else {
            var payload = {
              iss: req.hostname,
              sub: user._id
            };
            var token = jwt.encode(payload, secret);
            res.status(200).send({token:token});
          }
        });

      });

    }
  });
};
