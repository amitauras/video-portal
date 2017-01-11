/* jshint -W117, -W030 */
describe('login controller', function () {

    var authResponse = mockData.getMockAuthResponse;
    var failureResponse = mockData.failureAuthResponse;
    var credentials = {
        username: 'ali',
        password: 'password'
    };
    var invalidCredentials = {
        username: 'john',
        password: 'password'
    };
    var $httpFlush;

    beforeEach(module('blocks.auth', 'stateMock', bard.fakeToastr, function ($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));

    beforeEach(function () {
        bard.inject(this, '$httpBackend', '$controller', '$rootScope', 'auth', 'AUTH_URLS', 'AUTH_EVENTS', '$state');
        $httpFlush = $httpBackend.flush;
    });

    beforeEach(function () {
        controller = $controller('Login');
    });


    describe('Login', function () {
        it('should exists', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function () {
            it('should have initialized credentials', function () {
                expect(controller.credentials).not.to.equal(null);
            });
        });

        beforeEach(function () {
            sinon.spy($rootScope, '$broadcast');
        });

        describe('login function', function () {

            it('should exists', function () {
                expect(controller.login).to.be.defined;
            });

            it('should broadcast auth-login-failed on unsuccessful login', function () {
                $httpBackend.expectPOST(AUTH_URLS.loginUrl, {
                    username: 'john',
                    password: '5f4dcc3b5aa765d61d8327deb882cf99'
                }).respond(401, failureResponse);

                controller.login(invalidCredentials).then(function (res) {
                }).catch(function (e) {
                    expect($rootScope.$broadcast).to.have.been.calledWith(AUTH_EVENTS.loginFailed);
                });
                $httpFlush();
            });

            it('should broadcast auth-login-success on successful login', function () {
                $httpBackend.expectPOST(AUTH_URLS.loginUrl, {
                    username: 'ali',
                    password: '5f4dcc3b5aa765d61d8327deb882cf99'
                }).respond(200, authResponse);

                $state.expectTransitionTo('video.list');

                controller.login(credentials).then(function (res) {
                    expect($rootScope.$broadcast).to.have.been.calledWith(AUTH_EVENTS.loginSuccess);
                });
                $httpFlush();
            });

        });
    });
});