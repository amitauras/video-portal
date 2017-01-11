(function () {
    'use strict';
    angular.module('blocks.auth')
        .factory('auth', auth);

    /* @ngInject */
    function auth(AUTH_URLS, $http, session, md5, $rootScope, AUTH_EVENTS, $q, exception) {
        var services = {
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated
        };
        return services;
        ///////////////////////////////////

        function login(credentials) {
            /**
             * deferred object failes on status === 'error' from server followed by 
             * $rootScope.$broadcast(AUTH_EVENTS.loginFailed) in Login Controller
             */
            var deferred = $q.defer();
            var config = {
                method: 'POST',
                url: AUTH_URLS.loginUrl,
                data: {
                    username: credentials.username,
                    // encrypting password provided by using md5 hash otherwise authentication will fail
                    password: md5.createHash(credentials.password)
                }
            };
            
            $http(config).then(function (res) {
                if (res.data.status === 'success') {
                    // on successful authentication setting values returned from server into session service
                    session.create(res.data);
                    deferred.resolve(res.data);
                } else {
                    deferred.reject(res.data);
                }
            }, function(e) {
                exception.catcher('XHR Failed for login')(e);
                deferred.reject(e);
            });
            return deferred.promise;
        }

        function logout() {
            
            var config = {
                method: 'GET',
                url: AUTH_URLS.logoutUrl
            };

            return $http(config).then(function (res) {
                session.destroy();
                return res.data;
            }, function(e) {
                return exception.catcher('XHR Failed for logout')(e);
            });
        }

        function isAuthenticated() {
            // if information after authentication present in session service user is considered authenticated
            return !!session.authInfo();
        }
    }
} ());