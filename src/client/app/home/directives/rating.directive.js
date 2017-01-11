(function () {
    'use strict';
    angular.module('app.home')
        .directive('ratingElement', ratingElement);

    /* @ngInject */
    function ratingElement() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/home/directives/rating.html',
            scope: {
                'score': '=ngModel',
                'onRating': '&?'
            },
            compile: function (tElement) {
                tElement.addClass('rating-element');
                tElement.find('ul').addClass('rating-container');
                tElement.find('li').addClass('rating-icon');
                return postLink;
            }
        };
        return directive;
        /////////////////////////////////

        function postLink(scope, element, attributes) {
            scope.maxRating = 5;
            scope.updateRating = updateRating;

            /////////////////////////////////////////////

            function updateRating() {
                scope.points = [];
                for (var i = 0; i < scope.maxRating; i++) {
                    scope.points.push({
                        filled: i < scope.score
                    });
                }
            }

            /* toggle method calls parent onRating method and changes rating on view
            ************************************************************************/
            scope.toggle = function (index) {
                scope.score = index + 1;
                scope.onRating({
                    score: index + 1
                });
            };

            /* watch ng-model changes to update rating
            ****************************************************/
            scope.$watch('score', function (newValue, oldValue) {
                if (newValue) {
                    scope.updateRating();
                }
            });
        }
    }
} ());