/* Help configure the state-base ui.router */
(function () {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    /* @ngInject */
    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        /* jshint validthis:true */
        var config = {
            docTitle: undefined,
            resolveAlways: {}
        };

        $locationProvider.html5Mode(true);

        this.configure = function (cfg) {
            angular.extend(config, cfg);
        };

        this.$get = RouterHelper;
        RouterHelper.$inject = ['$location', '$rootScope', '$state', 'logger', 'auth', 'AUTH_EVENTS', 'STATES'];
        /* @ngInject */
        function RouterHelper($location, $rootScope, $state, logger, auth, AUTH_EVENTS, STATES) {
            var handlingStateChangeError = false;
            var hasOtherwise = false;
            var stateCounts = {
                errors: 0,
                changes: 0
            };

            var service = {
                configureStates: configureStates,
                getStates: getStates,
                stateCounts: stateCounts
            };

            init();

            return service;

            ///////////////

            function configureStates(states, otherwisePath) {
                states.forEach(function (state) {
                    state.config.resolve =
                        angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function handleRoutingErrors() {
                // Route cancellation:
                // On routing error, go to the dashboard.
                // Provide an exit clause if it tries to do it twice.
                $rootScope.$on('$stateChangeError',
                    function (event, toState, toParams, fromState, fromParams, error) {
                        if (handlingStateChangeError) {
                            return;
                        }
                        stateCounts.errors++;
                        handlingStateChangeError = true;
                        var destination = (toState &&
                            (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                            'unknown target';
                        var msg = 'Error routing to ' + destination + '. ' +
                            (error.data || '') + '. <br/>' + (error.statusText || '') +
                            ': ' + (error.status || '');
                        logger.warning(msg, [toState]);
                        $location.path('/');
                    }
                );
            }

            function init() {
                handleRoutingErrors();
                updateDocTitle();
                authenticationOnRouteChange();
            }

            function getStates() { return $state.get(); }

            function updateDocTitle() {
                $rootScope.$on('$stateChangeSuccess',
                    function (event, toState, toParams, fromState, fromParams) {
                        stateCounts.changes++;
                        handlingStateChangeError = false;
                        var title = config.docTitle + ' ' + (toState.title || '');
                        $rootScope.title = title; // data bind to <title>
                    }
                );
            }

            function authenticationOnRouteChange() {
                $rootScope.$on('$stateChangeStart',
                    function (event, toState, toParams, fromState, fromParams) {
                        if (!auth.isAuthenticated()) {
                            if (toState.settings.protected) {
                                event.preventDefault();
                                // user is not logged in
                                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                                $state.go(STATES.loginState);
                            }
                        } else {
                            if (toState.name === STATES.loginState) {
                                event.preventDefault();
                                switch (fromState.name) {
                                    case '':
                                    case 'home':
                                        $state.go(STATES.root);
                                        break;
                                }
                            }
                        }
                    });

                /* move user to root state of the application on login
                ******************************************************/
                $rootScope.$on(AUTH_EVENTS.loginSuccess,
                    function (event) {
                        $state.go(STATES.root);
                    });

                /* move user to login state on successful logout
                ******************************************************/
                $rootScope.$on(AUTH_EVENTS.logoutSuccess,
                    function (event) {
                        $state.go(STATES.loginState);
                    });
            }
        }
    }
})();
