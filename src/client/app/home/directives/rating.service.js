(function () {
    'use strict';
    angular.module('app.home')
        .factory('rating', rating);

    /* @ngInject */
    function rating($http, $location, exception, logger) {
        var service = {
            updateRating: updateRating
        };
        return service;
        /////////////////////////////////////////

        function updateRating(data) {
            var config = {
                method: 'POST',
                url: '/video/ratings',
                data: data
            };
            return $http(config)
                .then(ratingSuccess)
                .catch(ratingFailed);

            function ratingSuccess(res) {
                return res.data.data;
            }

            function ratingFailed(e) {
                $location.url('/');
                return exception.catcher('XHR Failed for getCustomer')(e);
            }
        }
    }
} ());