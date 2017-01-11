(function() {
    'use strict';

    angular
        .module('app.core', [
            /* Angular modules */
            'ngAnimate',
            'ngSanitize',
            /* Cross-app modules */
            'blocks.exception',
            'blocks.logger',
            'blocks.router',
            'blocks.auth',
            /* 3rd-party modules */
            'infinite-scroll',
            'vjs.video',
            'ui.router',
            'ngplus'
        ]);

})();
