(function () {
    'use strict';
    angular.module('blocks.auth')
        .service('session', session);

    /* @ngInject */
    function session($cookies) {
        var services = {
            authInfo: authInfo,
            create: create,
            destroy: destroy
        };
        return services;
        ///////////////////////////////////////

        function create(data) {
            return $cookies.put('auth', JSON.stringify(data));
        }

        function destroy() {
            return $cookies.remove('auth');
        }

        function authInfo() {
            return $cookies.get('auth');
        }
    }
} ());

/**
 * Session service to store, retrieve and delete info from cookies
 */