(function () {
    'use strict';

    window.AjaxHelper  = {
        makeAjaxCall: function (url, method, data) {
            return $.ajax({
                url: url,
                type: method,
                data: data
            });
        }
    };
}());