const config = {
    "APPLICATION_PORT": 5000,
    "DATABASE_TABLES": {
        "USERS": "users",
        "LOCATIONS": "locations",
        "PROJECTS": "projects",
        "ERRORS": "errors",
        "SESSIONS": "sessions"
    },
    "SESSION_LIFETIME": 24 * 60 * 60 * 1000, //24hrs
    "DATABASE_NAME": "fauxr-errors",
    "LOAD_STATES": {
        "-1": 'unknown',
        "0" : 'before document ready',
        "1" : 'before window load',
        "2" : 'after window load'
    },
    "SUPER_ADMIN": {
        "email": 'god@sfappworks.com',
        "password": 'iamthedanger'
    },
    "USER_ACTIONS": {
        "SIGN_IN": 'sign-in',
        "SIGN_OUT": 'sign-out'
    },
    "ERRORS": {
        "INVALID_EMAIL": "The email address provided does not appear to be valid.",
        "MISSING_FIELDS": "Please fill in all the required fields and try again."
    }
};

module.exports = config;