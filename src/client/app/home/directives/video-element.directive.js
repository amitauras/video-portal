/* jshint -W117, -W030 */
(function () {
    'use strict';
    angular.module('app.home')
        .directive('videoElement', videoElement);

    /* @ngInject */
    function videoElement(rating) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/home/directives/video-element.html',
            scope: {
                'config': '=ngModel',
                'gotoVideo': '&?'
            },
            compile: function (tElement) {
                tElement.addClass('video-element');
                return postLink;
            }
        };
        return directive;
        ///////////////////////////////////////

        function postLink(scope, element, attributes) {
            scope.score = 0;
            scope.onRating = onRating;
            scope.onTitle = onTitle;
            scope.update = update;

            var videos = element.find('video');

            /* Pause all videos except the currently playing
            *************************************************/
            videos.each(function () {
                this.pauseOthers = function (event) {
                    angular.element('video').addClass('stopped');
                    angular.element(this).removeClass('stopped');
                    angular.element('.stopped').each(function () {
                        this.pause();
                    });
                };
                this.addEventListener('play', this.pauseOthers.bind(this), false);
            });



            update();
            ///////////////////////////////////////////////////////

            function update() {
                scope.config.ratings.forEach(function (rating) {
                    scope.score += rating;
                });
                scope.score /= scope.config.ratings.length;

                return scope.score;
            }

            function onRating(data) {
                var config = {
                    videoId: scope.config._id,
                    rating: data.score
                };

                rating.updateRating(config).then(function (res) {
                    scope.config = res;
                    scope.update();
                });
            }

            function onTitle() {
                scope.gotoVideo ? scope.gotoVideo({
                    id: scope.config._id
                }) : angular.noop;
            }

            /* destroy all videos on garbage collection
            *******************************************************/
            scope.$on('$destroy', function (event) {
                angular.element(element).remove();
            });
        }
    }
} ());