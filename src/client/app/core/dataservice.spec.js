/* jshint -W117, -W030 */
describe('dataservice', function () {
    var authResponse = mockData.getMockAuthResponse;
    var video = mockData.getMockVideo();
    var videos = mockData.getMockVideos();
    var $httpFlush;
    var videoParam = {
        id: '575a04c765697bd0124763b6'
    };
    var credentials = {
        username: 'ali',
        password: 'password'
    };

    beforeEach(function () {
        bard.appModule('app.core');
        bard.inject(this, '$httpBackend', '$rootScope', 'dataservice', '$q', 'session', 'auth', 'AUTH_URLS');
    });

    beforeEach(function () {
        var videoPatt = /^\/video\?.*/;
        var videosPatt = /^\/videos\?sessionId=.*/;

        $httpBackend.when('POST', AUTH_URLS.loginUrl, {
            username: 'ali',
            password: '5f4dcc3b5aa765d61d8327deb882cf99'
        }).respond(200, authResponse);

        $httpBackend.when('GET', videoPatt).respond(200, video);
        $httpBackend.when('GET', videosPatt).respond(200, videos);
        $httpFlush = $httpBackend.flush;
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should be registered', function () {
        expect(dataservice).not.to.equal(null);
    });

    describe('When logged in', function () {

        it('should be logged in', function () {
            auth.login(credentials).then(function (res) {
                session.create(res);
                expect(auth.isAuthenticated()).to.be.equal(true);
            });
            $httpFlush();
        });

        describe('getVideos function', function () {
            it('should exist', function () {
                expect(dataservice.getVideos).not.to.equal(null);
            });

            it('should return 10 Videos', function (done) {
                dataservice.getVideos().then(function (data) {
                    expect(data.length).to.equal(10);
                }).then(done, done);
                $httpFlush();
            });
        });

        describe('getVideo function', function () {
            it('should exist', function () {
                expect(dataservice.getVideo).not.to.equal(null);
            });

            it('should return 1 Video', function (done) {
                dataservice.getVideo(videoParam).then(function (data) {
                    expect(data).not.to.equal(undefined);
                }).then(done, done);
                $httpFlush();
            });
        });

    });

    describe('ready function', function () {
        it('should exist', function () {
            expect(dataservice.ready).to.be.defined;
        });

        it('should return a resolved promise with the dataservice itself', function (done) {
            dataservice.ready().then(function (data) {
                expect(data).to.equal(dataservice);
            })
                .then(done, done);
            $rootScope.$apply(); // no $http so just flush
        });

        it('should return a promise with array of promises passed to it', function (done) {
            dataservice.ready($q.when({ id: 1 })).then(function (data) {
                expect(data).not.to.equal(dataservice);
            }).then(done, done);
            $rootScope.$apply(); // no $http so just flush
        });
    });
});
