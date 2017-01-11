(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[Video Portal] ', //Configure the exceptionHandler decorator
        appTitle: 'Video Portal'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$compileProvider', '$logProvider',
        'exceptionHandlerProvider', 'routerHelperProvider'];
    /* @ngInject */
    function configure($compileProvider, $logProvider,
        exceptionHandlerProvider, routerHelperProvider) {

        $compileProvider.debugInfoEnabled(true);

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        configureStateHelper();

        ////////////////

        function configureStateHelper() {
            var resolveAlways = { /* @ngInject */
                ready: function (dataservice) {
                    return dataservice.ready();
                }
            };

            routerHelperProvider.configure({
                docTitle: 'Video Portal: ',
                resolveAlways: resolveAlways
            });
        }
    }
})();
