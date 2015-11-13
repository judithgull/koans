var jwt = require("jwt-simple");
var User = require("../user/user-model.js");
var secret = 'veryBigSecret...';

export class LoginController {

  constructor(private bcrypt) {
  }

  login = (email:string, pwd:string, error:Function, success:Function) => {
    console.log(pwd);

    User.findOne({email: email}, (err, user) => {
      if (err) {
        console.log(err);
        error(err);
      } else if (!user) {
        error('Login failed');
      }
      else {
        this.bcrypt.compare(pwd, user.password, function (err, isValid) {

          if(isValid) {
            var payload = {
              sub: user._id
            };
            var token = jwt.encode(payload, secret);
            success(token);
          } else {
            error('Login failed');
          }
        });
      }
    });
  };

  postLogin = (req, res) => {
    res.format({
      "application/json": (req, res) => {
        var body = req.body;
        this.login(body.email, body.password,
          (err) => {
            console.log(err);
            res.send(err);
          }, (token) => {
            res.status(200).send({token: token})
          });

      }
    });
  };
}
