/* jshint -W117, -W030 */
describe('home', function () {
    describe('state', function () {
        var views = {
            videos: 'app/home/home.html',
            videodetail: 'app/home/video-detail.html'
        };

        beforeEach(function () {
            module('app.home', bard.fakeToastr);
            bard.inject(this, '$location', '$httpBackend', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(views.video, '');
            $templateCache.put(views.videodetail, '');
        });

        it('should map state video.list to url /video/list ', function() {
            expect($state.href('video.list', {})).to.equal('/video/list');
        });

        it('should map state video.detail to url /video/:id ', function() {
            expect($state.href('video.detail', {id: 7})).to.equal('/video/7');
        });

        it('should map /videos route to videos View template', function() {
            expect($state.get('video.list').templateUrl).to.equal(views.videos);
        });

        it('should map /video.details route to videos View template', function() {
            expect($state.get('video.detail').templateUrl).to.equal(views.videodetail);
        });

        it('of video.list should work with $state.go', function() {
            $state.go('video.list');
            $rootScope.$apply();
            expect($state.is('video.list'));
        });
    });
});
