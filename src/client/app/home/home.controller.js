(function () {
    'use strict';
    angular.module('app.home')
        .controller('Home', Home);

    /* @ngInject */
    function Home($state, dataservice, logger) {
        var vm = this;
        vm.videos = [];
        vm.gotoVideo = gotoVideo;
        vm.getVideos = getVideos;
        vm.title = 'Videos';
        vm.videosParams = {
            skip: 0,
            limit: 10
        };

        //////////////////////////////////////

        function getVideos(params) {
            return dataservice.getVideos(params).then(function (res) {
                vm.videos = res;
                setParams();

                logger.info('loaded videos');
                return vm.videos;
            });
        }

        function gotoVideo(v) {
            $state.go('video.detail', {
                id: v.id
            });
        }

        function setParams() {
            vm.videosParams.skip += 10;
            vm.videosParams.limit += 10;
        }
    }
} ());