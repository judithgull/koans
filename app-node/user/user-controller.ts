var url = require("url");
var Topic = require("./user-model.js");

module.exports.postUser = function (req, res) {
  res.format({
    "application/json": function (req, res) {

      var body = req.body;
      console.log(body);

      //var topic = new Topic();
      //topic.title = body.title;
      //topic.language = body.language;
      //topic.items = body.items;
      //
      //topic.save(function(err){
      //  if (err)
      //    res.send(topic);
      //});

    }
  });
};
