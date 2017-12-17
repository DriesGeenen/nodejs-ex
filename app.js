const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const app = express();
var router = express.Router();
const Result = require('./models/result'); //created model loading here
const User = require('./models/user');
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/resultRoutes');
const jsonwebtoken = require("jsonwebtoken");
require('./config/passport')(passport);

console.log(config.databaseString);

//Port number
var ip_addr = process.env.OPENSHIFT_NODEJS_IP   || '127.0.0.1';
var port    = process.env.OPENSHIFT_NODEJS_PORT || '8080';

console.log(process.env.OPENSHIFT_MONGODB_DB_USERNAME);
console.log(process.env.OPENSHIFT_MONGODB_DB_PASSWORD);
console.log(process.env.OPENSHIFT_MONGODB_DB_USERNAME);
console.log(process.env.OPENSHIFT_MONGODB_DB_PORT);
console.log(process.env.OPENSHIFT_APP_NAME);


mongoose.connection.on('connected', function () {
    console.log('Connected to database' + config.databaseString);
});

mongoose.connection.on('error', function (err) {
    console.log('Database error: ' + err);
});

app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], config.secret, function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            console.log('decode:' + JSON.stringify(req.user));
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

// Defaut route: alle routes beginnen bij /api/
// TODO: fix this
app.use('/api', router);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
userRoutes(app);
roomRoutes(app);

//index route
router.get('/', function (req, res) {
    res.json({message: 'Invalid Endpoint'});
});

//start server
app.listen(port, function () {
    console.log('Server started on port ' + port);
});



