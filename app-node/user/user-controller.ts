import url = require("url");
var userModel = require("./user-model.js");

export var postUser = (req, res) => {
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
