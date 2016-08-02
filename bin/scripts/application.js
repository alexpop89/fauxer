const express = require('express');
const config = require('../../config');
const bodyParser = require('body-parser');
const session = require('express-session');

const indexRoutes = require('./routes/index');
const errorRoutes = require('./routes/error');
const userRoutes = require('./routes/user');
const projectRouter = require('./routes/project');

const path = require('path');
const appDir = path.dirname(require.main.filename);

const DatabaseConnector = require('./models/utils/database-connector');
const UserClass = require('./models/user');
const ProjectClass = require('./models/project');
const Encrytper = require('./models/utils/encrypter');
const Helper = require('./models/utils/helper');

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
        this._setupSessions();
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

    _setupSessions() {
        this.nodeJsAppInstance.use(session({secret: config.SESSION_SECRET}));
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
        this.nodeJsAppInstance.use('/api/errors', errorRoutes);
        this.nodeJsAppInstance.use('/user', userRoutes);
        this.nodeJsAppInstance.use('/project', projectRouter);
    }

    _startListening() {
        this.nodeJsAppInstance.listen(this.nodeJsAppInstance.get('port'), () => {
            console.log('Node app is running on port', this.nodeJsAppInstance.get('port'));
        });
    }

    _setupDatabase() {
        DatabaseConnector.setup().then(() => {
            this._setupAdminGod().then(() => {
                this._setupMainProject();
            }, err => {
                throw new Error(err)
            });
        }, err => {
            throw new Error(err);
        });
    }

    _setupAdminGod() {
        return Encrytper.encryptPassword(config.SUPER_ADMIN.password).then(hash => {
            var superUserData = config.SUPER_ADMIN;

            superUserData.password = hash;
            return new UserClass(superUserData).save();
        });

    }

    _setupMainProject() {
        var mainProjectData = {
            name: 'LifeReimagined',
            owner: null,
            url: 'http://qa.lifereimagined.org'
        };

        DatabaseConnector.find(config.DATABASE_TABLES.USERS, ['id'], {email: config.SUPER_ADMIN.email}).then((rows) => {
            if (rows && rows[0]) {
                mainProjectData.owner = rows[0].id;
                return new ProjectClass(mainProjectData).save();
            }
        }, err => {
            throw new Error(err);
        });
    }
}

module.exports = new ApplicationController();