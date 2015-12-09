var jwt = require("jwt-simple");
var User = require("./user-model.js");

export var getSecret = () => {
  if(!process.env.SECRET){
    console.log('no secret defined, using default');
    return 'veryBigSecret...';
  }
  return process.env.SECRET;
};

export class UserController {

  constructor(private bcrypt) {
  }

  checkEmail = (email:string, error:Function, success:Function) => {
    User.findOne({email: email}, function (err, res) {
      if (err) {
        error(err);
      } else {
        if (res === null) {
          success();
        } else {
          error('This E-Mail already exists.');
        }
      }
    });


  };

  saveUser = (name:string, email:string, pwd:string, user, error:Function, success:Function) => {
    this.checkEmail(email, error, () => {
      this.bcrypt.hash(pwd, null, null, (err, hash) =>{

        user.name = name;
        user.email = email;
        user.password = hash;

        user.save((err) => {
          if (err) {
            error(err);
          } else {
            var payload = {
              sub: user._id
            };
            var token = jwt.encode(payload, getSecret());
            success(token, User.getNonSensitiveUser(user));
          }
        });
      });
    });
  };

  postUser = (req, res) => {
    res.format({
      "application/json": (req, res) => {
        var body = req.body;
        this.saveUser(body.name, body.email, body.password, new User(),
          (err) => {
            console.log(err);
            res.status(400).send({message:err});
          }, (token, user) => {
            res.status(200).send(
              {
                token: token,
                user: user
              })
          });

      }
    });
  };
}
