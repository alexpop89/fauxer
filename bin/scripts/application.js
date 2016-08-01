const express = require('express');
const config = require('../../config');
const bodyParser = require('body-parser');

const indexRoutes = require('./routes/index');
const errorRoutes = require('./routes/error');
const userRoutes = require('./routes/user');

const path = require('path');
const appDir = path.dirname(require.main.filename);

const DatabaseConnector = require('./models/utils/database-connector');
const UserClass = require('./models/user');
const Encrytper = require('./models/utils/encrypter');

let instance = null;

class ApplicationController {
    constructor() {
        console.log('Starting Node app ...');
        this.nodeJsAppInstance = this.nodeJsAppInstance || express();

        if (!instance) {
            this._setup();
            instance = this;
        }

        return instance;
    }

    _setup() {
        this._setupApplicationData();
        this._setupViews();
        this._setupBodyParser();
        this._setupRequestHeaders();
        this._setupRoutes();
        this._setupDatabase();
        this._startListening();
    }

    _setupApplicationData() {
        this.nodeJsAppInstance.set('port', (process.env.PORT || config.APPLICATION_PORT));
        this.nodeJsAppInstance.use(express.static(appDir + '/public'));
    }

    _setupViews() {
        this.nodeJsAppInstance.set('views', appDir + '/views');
        this.nodeJsAppInstance.set('view engine', 'ejs');
    }

    _setupBodyParser() {
        this.nodeJsAppInstance.use( bodyParser.json() ); // to support JSON-encoded bodies
        this.nodeJsAppInstance.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
    }

    _setupRequestHeaders() {
        this.nodeJsAppInstance.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            next();
        });
    }

    _setupRoutes() {
        this.nodeJsAppInstance.use('/', indexRoutes);
        this.nodeJsAppInstance.use('/errors', errorRoutes);
        this.nodeJsAppInstance.use('/user', userRoutes);
    }

    _startListening() {
        this.nodeJsAppInstance.listen(this.nodeJsAppInstance.get('port'), () => {
            console.log('Node app is running on port', this.nodeJsAppInstance.get('port'));
        });
    }

    _setupDatabase() {
        DatabaseConnector.setup().then(() => this._setupAdminGod(), err => { throw new Error(err); });
    }

    _setupAdminGod() {
        return Encrytper.encryptPassword(config.SUPER_ADMIN.password).then(hash => {
            var superUserData = config.SUPER_ADMIN;

            superUserData.password = hash;
            return new UserClass(superUserData).save();
        });

    }
}

module.exports = new ApplicationController();