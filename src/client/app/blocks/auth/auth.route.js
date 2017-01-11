(function () {
    'use strict';

    angular
        .module('blocks.auth')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/',
                    templateUrl: 'app/blocks/auth/templates/login.html',
                    controller: 'Login',
                    controllerAs: 'vm',
                    title: 'Login',
                    settings: {
                        protected: false
                    }
                }
            }, 
            {
                state: 'logout',
                config: {
                    url: '/logout',
                    controller: 'Logout',
                    controllersAs: 'vm',
                    title: 'Logout',
                    settings: {
                        nav: 2,
                        content: '<i class="mdi mdi-logout-variant"></i> Logout',
                        protected: true
                    }
                }
            }
        ];
    }
})();
