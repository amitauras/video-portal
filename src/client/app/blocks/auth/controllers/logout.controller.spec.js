/* jshint -W117, -W030 */
describe('logout controller', function () {
    var logoutResponse = mockData.logoutResponse;
    var $httpFlush;

    beforeEach(module('blocks.auth', 'stateMock', bard.fakeToastr, function ($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));

    beforeEach(function () {
        bard.inject(this, '$httpBackend', '$controller', '$rootScope', 'auth', 'AUTH_URLS', 'AUTH_EVENTS', '$state');
        $httpFlush = $httpBackend.flush;
    });

    beforeEach(function () {
        controller = $controller('Logout');
    });

    beforeEach(function () {
        sinon.spy($rootScope, '$broadcast');
    });

    beforeEach(function() {
        var logoutUrl = /^\/user\/logout?.*/;
        $httpBackend.when('GET', logoutUrl).respond(200, logoutResponse);
        $httpFlush = $httpBackend.flush;
    });

    describe('Logout', function () {

        it('should exists', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function () {

            it('should broadcast auth-logout-success event', function () {
                $state.expectTransitionTo('login');
                $httpFlush();
                expect($rootScope.$broadcast).to.have.been.calledWith(AUTH_EVENTS.logoutSuccess);
            });

        });
    });
});