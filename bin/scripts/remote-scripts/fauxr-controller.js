(function (windowObject, documentObject, uniqueHash) {
    'use strict';

    var INTERVAL_TIME = 1000;
    var ERRORS_ADDR = 'http://localhost:5000/api/errors';
    var LOCATION_ADDR = 'https://freegeoip.net/json/';
    var USER_AGENT = '';
    var LOCATION_DATA = '';

    windowObject._fauxrErrors = window._fauxrErrors || {id: uniqueHash, errors: []};
    windowObject._fauxrErrors.errors = window._fauxrErrors.errors || [];

    /* START FAUXR */
    init();
    getLocalData();
    /* DONE STARTING FAUXR */

    /* FUNCTION DECLARATIONS */
    function init() {
        windowObject.setInterval(function () {
            windowObject._fauxrErrors.errors.length && _requiredDataAvailable() && _postErrors(window._fauxrErrors, _xhrSuccess, _xhrError);
        }, INTERVAL_TIME);
    }

    function getLocalData() {
        USER_AGENT = windowObject.navigator.userAgent;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                LOCATION_DATA = (xhr.status === OK) ? xhr.responseText : {};
            }
        };

        xhr.open('GET', LOCATION_ADDR, true);
        xhr.send();
    }

    function _requiredDataAvailable() {
        return USER_AGENT.length && LOCATION_DATA.length;
    }

    function _xhrSuccess(response) {
        windowObject._fauxrErrors.errors = [];
    }

    function _xhrError(xhr) {
        console.log('%c Fauxr Error: ' + xhr.status, 'background: #404040; color: #00FF00');
    }

    function _postErrors(payload, successFn, errorFn) {
        var xhr = new XMLHttpRequest();

        payload = payload || {};

        if (!payload.errors) {
            return;
        }

        payload = _enhancePayload(payload);
        successFn = typeof successFn === 'function' ? successFn : function () {};
        errorFn = typeof errorFn === 'function' ? errorFn : function () {};

        xhr.onreadystatechange = function () {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                    successFn(xhr.responseText);
                } else {
                    errorFn(xhr);
                }
            }
        };

        xhr.open('POST', ERRORS_ADDR);
        xhr.setRequestHeader( "Content-Type", "application/json" );
        xhr.send(JSON.stringify(payload));
    }

    function _enhancePayload(payload) {
        for (var error in payload.errors) {
            if (payload.errors.hasOwnProperty(error)) {
                payload.errors[error].userAgent = USER_AGENT;
                payload.errors[error].locationData = JSON.parse(LOCATION_DATA);
                payload.errors[error].location = 0;
                payload.errors[error].stackTrace = payload.errors[error].error ? payload.errors[error].error.stack : null;
                delete payload.errors[error].error;
            }
        }

        return payload;
    }

    console.log('%c Fauxr Running! ', 'background: #404040; color: #00FF00');
}(window, document, "5762570e65f107d823000043"));