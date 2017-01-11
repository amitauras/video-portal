(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Navbar', Navbar);

    /* @ngInject */
    function Navbar($state, routerHelper) {
        var vm = this;
        var states = routerHelper.getStates();
        //vm.NavbarReady = function(){console.log('done animating menu')}; // example

        activate();

        function activate() { getNavRoutes(); }

        function getNavRoutes() {
            vm.navRoutes = states.filter(function(r) {
                return r.settings && r.settings.nav;
            }).sort(function(r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }
    }
})();
