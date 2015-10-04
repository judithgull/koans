var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TopicSchema   = new Schema({
  title: String,
  language: String,
  items: [{ id: Number,
      title: String,
      description: String,
      exercise: String,
      solution: String
  }]
});

module.exports = mongoose.model('Topic', TopicSchema);
