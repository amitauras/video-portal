/* jshint -W117, -W030 */
describe('testing', function () {
    var controller;
    var videos = mockData.getMockVideos();
    var videoId = mockData.blackWindow._id;
    var $httpFlush;

    beforeEach(function () {
        module('app.home', bard.fakeToastr);
        bard.inject(this, '$controller', '$log', '$q', '$httpBackend', '$rootScope', 'dataservice');
        $httpFlush = $httpBackend.flush;
    });

    beforeEach(function () {
        controller = $controller('Home');
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Home Controller', function () {

        it('should be successfully created', function () {
            expect(controller).to.be.defined;
        });

        it('should have a videos array', function () {
            expect(controller.videos).to.be.an('Array');
        });

        it('before activating the view videos array should be empty', function () {
            expect(controller.videos).to.have.length(0);
        });

        it('should have getVideos method', function () {
            expect(controller.getVideos).to.be.defined;
        });

        it('should have gotoVideo method', function () {
            expect(controller.getVideos).to.be.defined;
        });

        beforeEach(function () {
            bard.inject('auth', '$state');
        });

        describe('before login', function () {

            var logoutMessage = 'success';

            beforeEach(function () {
                var patt = /^\/user\/logout\?sessionId=.*/;
                $httpBackend.when('GET', patt).respond(200, logoutMessage);
            });

            /* making sure nobody is logged in if logged in logout the user
            ****************************************************************/
            it('nobody should be logged in', function () {
                var loggedIn = auth.isAuthenticated();
                if (loggedIn) {
                    auth.logout().then(function (status) {
                        expect(status).to.equal('success');
                    });
                    $httpFlush();
                }
            });

            describe('gotoVideo', function () {
                it('gotoVideo should not transition state to video.state', function () {
                    controller.gotoVideo({ id: '12345' });
                    expect($state.current.name).to.equal('');
                });
            });


        });

        describe('after login', function () {
            var authResponse = mockData.getMockAuthResponse;
            var loginParams = {
                username: 'ali',
                password: '5f4dcc3b5aa765d61d8327deb882cf99'
            };

            beforeEach(function () {
                bard.inject('AUTH_URLS');
            });

            beforeEach(function () {
                $httpBackend.when('POST', AUTH_URLS.loginUrl).respond(200, authResponse);
            });

            /* making sure that user is logged in
            **************************************/
            it('should be logged in', function () {
                auth.login(loginParams).then(function (res) {
                    expect(res.status).to.equal('success');
                });
                $httpFlush();
            });

            describe('gotoVideo', function () {

                it('gotoVideo should transition state to video.detail', function () {
                    controller.gotoVideo({ id: videoId });
                    $rootScope.$apply();
                    expect($state.current.name).to.equal('video.detail');
                });

            });

            describe('getVideos', function () {
                var videosParams = {
                    skip: 0,
                    limit: 10
                };

                beforeEach(function () {
                    var patt = /^\/videos\?.*/;
                    $httpBackend.when('GET', patt).respond(200, videos);
                });

                it('should return 10 videos', function () {
                    controller.getVideos(videosParams).then(function (res) {
                        expect(res).to.have.length(10);
                    });
                    $httpFlush();
                });
            });


        });

    });

});