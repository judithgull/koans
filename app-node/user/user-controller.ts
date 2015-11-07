import url = require("url");
var bcrypt = require("bcrypt-nodejs");
var User = require("./user-model.js");

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
          if (err)
            res.send(err);
          else
            console.log('user saved');
        });

      });

    }
  });
};
