'use strict'
var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'),
    bodyParser = require('body-parser');
var shutting_down = false;
var server = null;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://adminarsal:jewelArsal@localhost:27017/uwebdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log('Middleware Interrupt: ' + res.statusCode);
    return next();
    // return res;
    // res.status(404).send({url: req.originalUrl + ' not found'});
});

var routes = require('./api/routes/todoListRoutes');
routes(app);

server = app.listen(port);
console.log('todo list RESTful API server started on: ' + port);

app.use(function (req, resp, next) {
    if (!shutting_down)
        return next();

    resp.setHeader('Connection', "close");
    resp.send(503, "Server is in the process of restarting");
    // Change the response to something your client is expecting:
    //   html, text, json, etc.
});

function cleanup() {
    shutting_down = true;
    server.close(function () {
        console.log("Closed out remaining connections.");
        mongoose.disconnect();
        // Close db connections, other chores, etc.
        process.exit();
    });

    setTimeout(function () {
        console.error("Could not close connections in time, forcing shut down");
        mongoose.disconnect();
        process.exit(1);
    }, 30 * 1000);

}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
