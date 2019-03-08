import * as admin from 'firebase-admin';
const User = require('./user-model');

export class UserController {
  private saveUser = (user, error: (err) => void, success: (user) => void) => {
    User.findOne({ email: user.email }, function(err, res) {
      if (err) {
        error(err);
      } else {
        if (res === null) {
          // create
          user.save(err => {
            if (err) {
              console.log('error');
              error(err);
            } else {
              success(User.getNonSensitiveUser(user));
            }
          });
        } else {
          // update
          res.uid = user.uid;
          res.name = user.name;

          res.save(err => {
            if (err) {
              console.log('error');
              error(err);
            } else {
              success(User.getNonSensitiveUser(user));
            }
          });
        }
      }
    });
  };

  getIdToken(req): string {
    if (!req.headers || !req.headers.authorization) {
      return null;
    }
    return req.headers.authorization.split(' ')[1];
  }

  decodeToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return admin.auth().verifyIdToken(idToken);
  }

  postUser = (req, res) => {
    res.format({
      'application/json': (req, res) => {
        const idToken = this.getIdToken(req);
        if (!idToken) {
          res.status(401).send({ message: 'Login Required!' });
        } else {
          const p = this.decodeToken(idToken);
          p.then(decodedToken => {
            const user = new User();
            user.uid = decodedToken.uid;
            user.name = decodedToken.name;
            user.email = decodedToken.email;

            this.saveUser(
              user,
              err => {
                console.log(err);
                res.status(400).send({ message: err });
              },
              user => {
                res.status(200).send({
                  user: user
                });
              }
            );
          }).catch(function(error) {
            console.log('error' + error);
            res.status(401).send({ message: 'Login Required!' });
          });
        }
      }
    });
  };
}
