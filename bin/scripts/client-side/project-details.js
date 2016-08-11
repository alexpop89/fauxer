/*global AjaxHelper*/

(function () {
    'use strict';

    var ProjectDetailsController = {
        initialize: function () {
            //$('.source span').on('click', this._showSourceDetails.bind(this));
            $('.toggle-stack-trace').on('click', this._toggleStackTrace.bind(this));
            $('.error-popover').on('click', this._popoverHide.bind(this));
        },

        _showSourceDetails: function (event) {
            debugger;
            let $element = $(event.target);
            let url = $element.text().replace($element.find('strong').text(), '');
            let lineNo = $element.find('strong').text().split(':')[1];
            let colNo = $element.find('strong').text().split(':')[2];
            let projectId = location.pathname.split('/project/details/')[1];
            let errorId = $element.attr('data-error-id');

            AjaxHelper.makeAjaxCall('/api/errors/details/' + projectId + '/' + errorId, 'GET').then(this._gotSourceDetailsSuccess.bind(this, $element));
        },

        _gotSourceDetailsSuccess: function ($element, data) {
            let index = 0;

            for (let line in data) {
                if (data.hasOwnProperty(line)) {
                    $element.parent().find('.error-popover div').eq(index).text(line + ': ' + data[line]);
                    index += 1;
                }
            }

            $element.parent().find('.error-popover').attr('data-has-content', true).fadeIn();
        },

        _popoverHide: function (event) {
            $(event.currentTarget).fadeOut();
        },

        _toggleStackTrace: function (event) {
            var $errorListItem = $(event.target).parent();
            var collapsed = $errorListItem.attr('data-collapsed') === 'true';

            $errorListItem.attr('data-collapsed', !collapsed);

            if (collapsed) {
                $errorListItem.find('.stack-trace').slideUp();
            } else {
                $errorListItem.find('.stack-trace').slideDown();
            }
        }
    };

    $(document).on('DOMContentLoaded', ProjectDetailsController.initialize.bind(ProjectDetailsController));
}());