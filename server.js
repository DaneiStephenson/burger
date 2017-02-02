var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = 8675;

// Serve static content for the app to the browser:: (process.cwd)vs(_dirname +) ???
app.use(express.static(process.cwd() + "/"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

///requiring handlebars 
var exphbs = require("express-handlebars");
  app.engine("handlebars", exphbs({ defaultLayout: "main" }));
  app.set("view engine", "handlebars");

//mysql
var mysql = require("mysql");

if(process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "burgers_db"
});
 };

  connection.connect(function(err) {
    console.log("connected as id " + connection.threadId);
  });

///route
app.get("/", function(req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) throw err;
    res.render("index", {burgers_db : data });
  });
});

///////
app.post("/", function(req, res) {
  connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [req.body.event], function(err, result) {
    if (err) throw err;
    res.redirect("/");
  });

});

app.post("/devoured/:id", function(req, res) {
  var id = req.params.id

  connection.query("UPDATE burgers SET devoured = 1 WHERE id = ?", id, function(err, results){
    if (err) throw err;
    res.redirect("/");
  })  
})
///////
app.listen(port, function() {
  console.log("Listening on port " + port)
});
