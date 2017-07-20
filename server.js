'use strict';
var express = require("express"),
    app = express(),
    port = process.env.PORT || 3150,
    mongoose = require('mongoose'),
    BaseCategory = require('./api/models/baseCategory'),
    Category = require('./api/models/category'),
    Item = require('./api/models/item'),
    CategoryRel = require('./api/models/categoryRel'),
    Discount = require('./api/models/discount'),
    ContactUs = require('./api/models/contactUs'),
    // BaseCategoryController = require('./api/controllers/baseCategoyController'),
    User = require('./api/models/user'),
    bodyParser = require('body-parser'),
    _ = require('underscore'),
    session = require('express-session'),
    passport = require('passport');
var shutting_down = false;
var server = null;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://adminarsal:jewelArsal@localhost:27017/uwebdb');

require('./api/controllers/userController')(passport);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const webapp = __dirname + '/api/web-app';
app.use(express.static(webapp));
app.use(express.static(webapp+'/jxjljzv'));

// Require for passport 
app.use(session({ 
    secret: 'uwebdbappsession',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
})); // this should be hidden 
app.use(passport.initialize());
app.use(passport.session()); // creates a persistent login sessions
//app.use(flash()); // use connect-flash for flash messages stored in sessions

// For UI
app.get('/', (req, res) => {    
    res.sendFile(__dirname + '/api/web-app' + '/login.html');
});

app.all('/auth', passport.authenticate('local-login'), function(req, res){
    
    res.sendfile(__dirname + '/api/web-app/jxjljzv/main.html');
});

app.use(function (req, res, next) {
    console.log('Middleware Interrupt: ' + res.statusCode);
    if (req.isAuthenticated() || req.url.includes('/item')){
            console.log('user is authenicated');
            next();
    } else {
        console.log('user is NOT authenicated');
        res.redirect('/');
    }
    // return res;
    // res.status(404).send({url: req.originalUrl + ' not found'});
});

app.get('/me', function(req, res){
    console.log('----------print here------------------', req.user.username);
    res.json(req.user.username);
});

// var newUser = new User();
// newUser.username = 'admin1';
// newUser.password = newUser.generateHash('siddiqui1');
// newUser.save();

// app.all('/auth', (req, res) => {
//     // res.sendFile(__dirname + '/api/web-app'+'/login.html');
//     const inp = _.pick(req.body, 'username', 'password');
//     console.log(inp);
    
//     // TODO: Remove true from below condition after development
//     if (inp.username === 'kbhai' && inp.password === 'aa' || true) {
//         res.sendfile(__dirname + '/api/web-app/jxjljzv/main.html');
//     }
// });

// api
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
