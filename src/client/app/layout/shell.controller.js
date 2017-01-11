/* jshint -W117, -W030 */
(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('Shell', Shell);

    /* @ngInject */
    function Shell($timeout, config, logger, auth) {
        var vm = this;

        vm.title = config.appTitle;
        vm.busyMessage = 'Loading ...';
        vm.isBusy = true;
        vm.showSplash = true;
        vm.tagline = {
            text: 'Video Portal'
        };
        vm.isAuthenticated = false;

        activate();

        /////////////////////////////

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);
            hideSplash();
            vm.isAuthenticated = isAuthenticated;
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function () {
                vm.showSplash = false;
            }, 1000);
        }

        function isAuthenticated() {
            return auth.isAuthenticated();
        }
        
    }
})();
