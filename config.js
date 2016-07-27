const config = {
    "APPLICATION_PORT": 5000,
    "DATABASE_TABLES": {
        "USERS": "users",
        "LOCATIONS": "locations",
        "PROJECTS": "projects",
        "ERRORS": "errors"
    },
    "DATABASE_NAME": "fauxr-errors",
    "LOAD_STATES": {
        "-1": 'unknown',
        "0" : 'before document ready',
        "1" : 'before window load',
        "2" : 'after window load'
    },
    "SUPER_ADMIN": {
        'email': 'god@sfappworks.com',
        'password': 'iamthedanger'
    }
};

module.exports = config;