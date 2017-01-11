(function () {
    'use strict';
    angular.module('blocks.auth')
        .controller('Login', Login);

    /* @ngInject */
    function Login(auth, $rootScope, AUTH_EVENTS, $q) {
        var vm = this;
        vm.credentials = null;
        vm.login = login;
        vm.loginFailed = false;

        activate();
        //////////////////////////////////////

        function activate() {
            vm.credentials = {
                username: '',
                password: ''
            };
        }

        function login(credentials) {
            var deferred = $q.defer();
            auth.login(credentials).then(function (res) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                vm.loginFailed = false;
                deferred.resolve(res.data);
            }, function (e) {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                vm.loginFailed = true;
                deferred.reject(e);
            });
            return deferred.promise;
        }
    }
} ());