(function () {
    'use strict';
    angular.module('blocks.auth')
        .controller('Logout', Logout);

    /* @ngInject */
    function Logout(auth, $rootScope, AUTH_EVENTS) {
        var vm = this;

        activate();
        //////////////////////////////////////

        function activate() {
            /* Logout user on activation of logout state
            ***************************************************/

            return auth.logout().then(function (res) {
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                return res.data;
            });
        }

    }
} ());

