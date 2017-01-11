(function () {
    'use strict';

    angular
        .module('app.home')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'video',
                config: {
                    abstract: true,
                    template: '<ui-view/>',
                    url: '/video'
                }
            },
            {
                state: 'video.list',
                config: {
                    url: '/list',
                    templateUrl: 'app/home/home.html',
                    controller: 'Home',
                    controllerAs: 'vm',
                    title: 'Home',
                    settings: {
                        nav: 1,
                        content: '<i class="mdi mdi-home"></i> Home',
                        protected: true
                    }
                }
            },
            {
                state: 'video.detail',
                config: {
                    url: '/:id',
                    templateUrl: 'app/home/video-detail.html',
                    controller: 'VideoDetail',
                    controllerAs: 'vm',
                    title: 'Video Detail',
                    settings: {
                        protected: true
                    }
                }
            }
        ];
    }
})();
