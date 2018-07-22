'use strict';
var express = require("express"),
    path = require('path'),
    app = express(),
    port = process.env.PORT || 3150,
    mongoose = require('mongoose'),
    BaseCategory = require('./../client/api/models/baseCategory'),
    Category = require('./../client/api/models/category'),
    Item = require('./../client/api/models/item'),
    CategoryRel = require('./../client/api/models/categoryRel'),
    Discount = require('./../client/api/models/discount'),
    ContactUs = require('./../client/api/models/contactUs'),
    Payment = require('./../client/api/models/payment'),
    Authorize = require('./../client/api/models/onAuthorize'),
    // BaseCategoryController = require('./api/controllers/baseCategoyController'),
    User = require('./../client/api/models/user'),
    bodyParser = require('body-parser'),
    _ = require('underscore'),
    session = require('express-session'),
    passport = require('passport'),
    multer = require('multer'); // multer acts as a middleware
var shutting_down = false;
var server = null;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://adminarsal:jewelArsal@localhost:27017/uwebdb');

require('./../client/api/controllers/userController')(passport);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const webapp = __dirname + '/../client/api/web-app';
app.use(express.static(path.resolve(webapp)));
app.use(express.static(path.resolve(webapp+'/jxjljzv')));
app.use(express.static(path.resolve(__dirname + '/../../shared-img')));

// Require for passport 
app.use(session({ 
    secret: 'uwebdbappsession',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000}
})); // this should be hidden 
app.use(passport.initialize());
app.use(passport.session()); // creates a persistent login sessions

// Saving images
var storage = multer.diskStorage({
    destination: function(req, file, cb){ 
        // cb(null, __dirname + '/../../shared-img/item/' + req.query.itemPath);
        cb(null, __dirname + '/../../shared-img/item/');
    },
    filename: function(req, file, cb) {
        var finalFileName = req.query.fileName;
        cb(null, finalFileName);
    }
});


var upload = multer({ storage: storage });

//app.use(flash()); // use connect-flash for flash messages stored in sessions

// For UI
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../client/api/web-app/login.html'));
});

app.all('/auth', passport.authenticate('local-login'), function(req, res){
    res.sendfile(path.resolve(__dirname + '/../client/api/web-app/jxjljzv/main.html'));
});

app.use(function (req, res, next) {
    console.log('Middleware Interrupt: ' + res.statusCode);
    if (req.isAuthenticated() || req.url.includes('/item') || req.url.includes('/thing') || req.url.includes('/onAuthorize')){

            console.log('reqeust is entered');
            next();

    } else {
        console.log('user is NOT authenicated');
        res.redirect('/');
    }
});

app.get('/me', function(req, res){
    console.log('----------print here------------------', req.user.username);
    res.json(req.user.username);
});

// This is how to make a new user
    // var newUser = new User();
    // newUser.username = 'admin1';
    // newUser.password = newUser.generateHash('siddiqui1');
    // newUser.save();

// old code for auth
    // app.all('/auth', (req, res) => {
    //     // res.sendFile(__dirname + '/api/web-app'+'/login.html');
    //     const inp = _.pick(req.body, 'username', 'password');
    //     console.log(inp);
        
    //     if (inp.username === 'kbhai' && inp.password === 'aa' || true) {
    //         res.sendfile(__dirname + '/api/web-app/jxjljzv/main.html');
    //     }
    // });

// api
var routes = require('./../client/api/routes/uwebMongo');
routes(app, upload);

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