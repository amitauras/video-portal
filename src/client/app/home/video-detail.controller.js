(function () {
    'use strict';
    angular.module('app.home')
        .controller('VideoDetail', VideoDetail);

    /* @ngInject */
    function VideoDetail($stateParams, $window, dataservice, logger) {
        var vm = this;
        vm.video = null;
        vm.title = 'Video Detail';
        
        activate();
        ///////////////////////////////////////////

        function activate() {
            return getVideo($stateParams.id).then(function() {
                logger.info('Activated Video Detail View');
            });
        }

        function getVideo(id) {
            return dataservice.getVideo(id).then(function(res) {
                vm.video = res;
                return vm.video;
            });
        }
        
    }
} ());