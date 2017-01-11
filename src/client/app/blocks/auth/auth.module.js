(function () {
    'use strict';
    angular.module('blocks.auth', [
        /* Angular Modules */
        'ngCookies',
        /* Cross-app modules */
        'blocks.router',
        'blocks.exception',
        /* 3rd party modules */
        'ngMd5'
    ]);
} ());