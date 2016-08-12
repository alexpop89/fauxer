/*global AjaxHelper*/

(function () {
    'use strict';

    var ErrorDetailsController = {
        initialize: function () {
            $('#ignore-this').on('click', this._ignoreThis.bind(this));
            $('#ignore-all').on('click', this._ignoreAll.bind(this));
            $('#delete').on('click', this._delete.bind(this));
            $('#email').on('click', this._email.bind(this));
            $('#create-jira-ticket').on('click', this._create-jira-ticket.bind(this));
        },

        _ignoreThis: function (event) {

        },

        _ignoreAll: function (event) {

        },

        _delete: function (event) {

        },

        _email: function (event) {

        },

        _create: function (event) {
            
        }
    };

    $(document).on('DOMContentLoaded', ErrorDetailsController.initialize.bind(ErrorDetailsController));
}());