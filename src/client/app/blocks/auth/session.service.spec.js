/* jshint -W117, -W030 */
describe('session service', function () {
    var authResponse = mockData.getMockAuthResponse;
    var $httpFlush;
    var logoutResponse = {
        status: 'success'
    };
    var credentials = {
        username: 'ali',
        password: 'password'
    };

    beforeEach(function () {
        bard.appModule('blocks.auth');
        bard.inject(this, '$httpBackend', 'session', 'auth', 'AUTH_URLS');
    });

    beforeEach(function () {
        var logoutUrl = /^\/user\/logout\?sessionId=.*/;
        $httpBackend.when('POST', AUTH_URLS.loginUrl).respond(200, authResponse);
        $httpBackend.when('GET', logoutUrl).respond(200, logoutResponse);
        $httpFlush = $httpBackend.flush;
    });

    beforeEach(function () {
        session.sessionId = null;
        session.username = null;
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should be registered', function () {
        expect(session).not.to.equal(null);
    });

    describe('create function', function () {
        it('should exists', function () {
            expect(auth.create).to.be.defined;
        });

        it('should set a valid on successful authentication', function () {
            auth.login(credentials).then(function (res) {
                session.create(res);
                expect(session.authInfo()).not.to.equal(false);
            });
            $httpFlush();
        });
    });

    describe('destroy function', function() {
        it('should exists', function() {
            expect(session.destroy).not.to.equal(null);
        });

        it('should destory saved session on logout', function () {
            auth.logout().then(function (res) {
                session.destroy();
                expect(session.authInfo()).not.to.equal(true);
            });
            $httpFlush();
        });
    });
});