var mongoose = require('mongoose');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;


var TopicSchema = new Schema({
  title: String,
  programmingLanguage: String,
  authorId: ObjectId,
  items: [{
    sortOrder: Number,
    title: String,
    description: String,
    exercise: String,
    solution: String
  }]
});

module.exports = mongoose.model('Topic', TopicSchema);
