/* jshint -W117, -W030 */
describe('app.home', function () {
    var controller;
    var video = mockData.getMockVideos()[0];
    var params = {
        skip: 0,
        limit: 10
    };
    var id = mockData.blackWindow._id;

    beforeEach(function () {
        bard.appModule('app.home');
        bard.inject(this, '$controller', '$log', '$q', '$rootScope', '$stateParams', 'dataservice');
    });

    beforeEach(function () {
        sinon.stub(dataservice, 'getVideo')
            .returns($q.when(video))
            .withArgs(id);
        controller = $controller('VideoDetail');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Video Detail controller', function () {
        it('should exists', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function () {
            describe('should have called dataservice.getVideo', function () {
                beforeEach(function () {
                    $stateParams.id = id;
                });

                it('1 time', function () {
                    expect(dataservice.getVideo).to.have.been.calledOnce;
                });
            });

            it('should have title of Video Detail', function () {
                expect(controller.title).to.equal('Video Detail');
            });

            it('should have a video', function () {
                expect(controller.video).to.be.defined;
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});
