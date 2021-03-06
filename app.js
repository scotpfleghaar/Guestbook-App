var express = require('express');
var logger = require('morgan');
var path = require('path');
var http = require('http');
var bodyParser = require("body-parser");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var entries = [];
app.locals.entries = entries;


app.use(logger("dev"));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.get("/", function (request, response) {
    response.render("index");
});

app.get("/new-entry", function (request, response) {
    response.render("new-entry");
});


app.post("/new-entry", function (request, response) {
    if (!request.body.title || !request.body.content) {
        response.status(400).send("Entries must have a title and a body");
        return;
    }
    entries.push({
        title: request.body.title,
        content: request.body.content,
        published: new Date()
    });
    response.redirect("/");
});


app.use(function (req, res) {
    res.statusCode = 404;
    res.end("404!");
});


http.createServer(app).listen(3000, function () {
    console.log("Guestbook app is running on port 3000");
});