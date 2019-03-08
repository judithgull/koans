var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  uid: String,
  name: String,
  email: String
});

module.exports = mongoose.model('User', UserSchema);
module.exports.getNonSensitiveUser = user => {
  return {
    id: user._id,
    name: user.name
  };
};
