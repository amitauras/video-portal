(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger) {
        /* jshint validthis:true */
        var readyPromise;

        var service = {
            getVideo: getVideo,
            getVideos: getVideos,
            ready: ready
        };

        return service;
        ///////////////////////////////////////////////

        function getVideo(id) {
            var config = {
                method: 'GET',
                url: '/video',
                params: {
                    videoId: id
                }
            };

            return $http(config)
                .then(getVideoSuccess)
                .catch(getVideoFailed);

            function getVideoSuccess(res, status, headers, config) {
                var data = res.data.data;
                data.media = {
                    sources: [
                        {
                            src: data.url,
                            type: 'video/mp4'
                        }
                    ]
                };
                return data;
            }

            function getVideoFailed(e) {
                $location.url('/');
                return exception.catcher('XHR Failed for getCustomer')(e);
            }
        }

        function getVideos(params) {
            var config = {
                method: 'GET',
                url: '/videos',
                params: params
            };

            return $http(config)
                .then(getVideosSuccess)
                .catch(getVideosFailed);

            function getVideosSuccess(res, status, headers, config) {
                var records = res.data.data;
                records.forEach(function(item) {
                    item.media = {
                        sources: [
                            {
                                src: item.url,
                                type: 'video/mp4'
                            }
                        ]
                    };
                });
                return records;
            }

            function getVideosFailed(e) {
                $location.url('/');
                return exception.catcher('XHR Failed for getCustomer')(e);
            }
        }

        function getReady() {
            if (!readyPromise) {
                // Apps often pre-fetch session data ("prime the app")
                // before showing the first view.
                // This app doesn't need priming but we add a
                // no-op implementation to show how it would work.
                logger.info('Primed the app data');
                readyPromise = $q.when(service);
            }
            return readyPromise;
        }

        function ready(promisesArray) {
            return getReady()
                .then(function () {
                    return promisesArray ? $q.all(promisesArray) : readyPromise;
                })
                .catch(exception.catcher('"ready" function failed'));
        }
    }
})();
