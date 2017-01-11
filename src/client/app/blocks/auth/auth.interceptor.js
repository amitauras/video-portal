(function () {
    'use strict';
    angular.module('blocks.auth')
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push([
                '$injector',
                function ($injector) {
                    return $injector.get('authInterceptor');
                }
            ]);
        })
        .factory('authInterceptor', function ($rootScope, $q, session, AUTH_EVENTS) {
            return {
                request: request,
                responseError: responseError
            };

            /**
             * authInterceptor adds sessionId to each request after successful authentication
             */
            function request(config) {
                var htmlPattern = new RegExp(/^(.*\.(?!(htm|html)$))?[^.]*$/i);
                var loginUrlPattern = new RegExp(/^\/user\/auth$/);
                if (htmlPattern.test(config.url) && !loginUrlPattern.test(config.url)) {
                    var authInfo = session.authInfo();
                    if (authInfo) {
                        config.params = config.params || Object.create(Object.prototype);
                        config.params.sessionId = JSON.parse(authInfo).sessionId;
                    }
                }
                return config;
            }

            function responseError(response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[response.status], response);
                return $q.reject(response);
            }
        });
} ());