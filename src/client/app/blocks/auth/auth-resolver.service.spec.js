/* jshint -W117, -W030 */
describe('auth-resolver', function () {
    var authResponse = mockData.getMockAuthResponse;
    var $httpFlush;
    var credentials = {
        username: 'ali',
        password: 'password'
    };

    beforeEach(function () {
        bard.appModule('blocks.auth');
        bard.inject(this, '$httpBackend', 'authResolver', 'auth', 'AUTH_URLS', 'session');
    });

    beforeEach(function () {
        $httpBackend.when('POST', AUTH_URLS.loginUrl).respond(200, authResponse);
        $httpFlush = $httpBackend.flush;
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('authResolver service', function () {
        it('should exists', function () {
            expect(authResolver).to.be.defined;
        });
    });

    describe('resolve function', function () {
        it('should exists', function () {
            expect(authResolver.resolve).to.be.defined;
        });

        it('when called without setting session gives error', function () {
            authResolver.resolve()
                .catch(function (error) {
                    expect(error).not.to.equal(undefined);
                });
        });

        it('when called after setting session gives authInfo', function () {
            auth.login(credentials).then(function (res) {
                session.create(res);
                authResolver.resolve()
                    .then(function (res) {
                        expect(res).to.equal(session.authInfo());
                    });
            });
            $httpFlush();
        });
    });
});