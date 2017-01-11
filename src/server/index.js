//requiring NPM modeles
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var four0four = require('./routes/404')();
var mongoose = require('mongoose');
var db = mongoose.connection;
var app = express();

var environment = process.env.NODE_ENV;

db.on('error', console.error);

//requiring local modeles
var configs = require('./config');
var routes = require('./routes/routes');
var userModel = require('./models/users');
var helperFunctions = require('./helpers/helperFunctions');


// Uncomment the following lines to start logging requests to consoles.
// app.use(morgan('combined'));
// parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json.
app.use(bodyParser.json());

//connedting to mongoDB
mongoose.connect('mongodb://' + configs.dbHost + '/' + configs.dbName);
//populating data if DB is not already populated.
helperFunctions.populateDb();

//Initilizing routes.
routes(app);

switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./.tmp'));
        // serve video files.
        app.use('/videos', express.static('./src/client/videos'));
        // All the assets are served at this point.
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./src/client/index.html'));
        break;
}

//Finally starting the listener
app.listen(configs.applicationPort, function () {
    console.log('Example app listening on port ' + configs.applicationPort + '!');
});
