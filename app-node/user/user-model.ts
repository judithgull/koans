var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model("User", UserSchema);
module.exports.getNonSensitiveUser = (user) => {
  return {
    _id: user._id,
    email: user.email,
    name: user.name
  };
};

