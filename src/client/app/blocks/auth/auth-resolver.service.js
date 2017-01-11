(function () {
    'use strict';
    angular.module('blocks.auth')
        .factory('authResolver', authResolver);

    /* @ngInject */
    function authResolver($q, session, AUTH_EVENTS) {
        return {
            resolve: function() {
                var userInfo = session.authInfo();
                if(angular.isDefined(userInfo)) {
                    return $q.when(userInfo);
                } else {
                    return $q.reject({
                        message: AUTH_EVENTS.notAuthenticated
                    });
                }
            }
        };
    }
} ());

/**
 * This service is used before making tansition to a state,
 * to determine whether the user is authenticated or not for the transition to occur
 */