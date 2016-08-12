/*global AjaxHelper*/

(function () {
    'use strict';

    var ProjectDetailsController = {
        initialize: function () {
            $('.toggle-stack-trace').on('click', this._toggleStackTrace.bind(this));
            $('.error-popover').on('click', this._popoverHide.bind(this));
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