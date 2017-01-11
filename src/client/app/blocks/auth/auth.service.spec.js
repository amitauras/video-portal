/* jshint -W117, -W030, -W101 */
describe('auth service', function () {
    var authResponse = mockData.getMockAuthResponse;
    var failureResponse = mockData.failureAuthResponse;
    var logoutResponse = mockData.logoutResponse;
    var $httpFlush;

    var credentials = {
        username: 'ali',
        password: 'password'
    };
    var invalidCredentials = {
        username: 'john',
        password: 'password'
    };
    
    beforeEach(function () {
        bard.appModule('blocks.auth');
        bard.inject(this, '$httpBackend', '$cookies', '$rootScope', 'auth', 'AUTH_URLS', 'md5', 'session', 'AUTH_EVENTS');
    });

    beforeEach(function () {
        var logoutUrl = /^\/user\/logout\?sessionId=.*/;

        $httpBackend.when('POST', AUTH_URLS.loginUrl, {
            username: 'ali',
            password: '5f4dcc3b5aa765d61d8327deb882cf99'
        }).respond(200, authResponse);

        $httpBackend.when('GET', logoutUrl).respond(200, logoutResponse);
        $httpFlush = $httpBackend.flush;
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should be registered', function () {
        expect(auth).not.to.equal(null);
    });

    describe('AUTH_URLS', function () {
        it('should exists', function () {
            expect(AUTH_URLS).not.to.equal(null);
        });
    });

    describe('login function', function () {
        it('should exists', function () {
            expect(auth.login).to.be.defined;
        });

        it('password should be md5 encrypted', function () {
            expect(md5.createHash(credentials.password)).to.equal('5f4dcc3b5aa765d61d8327deb882cf99');
        });

        

        it('should not authenticate on invalid credentials', function() {
            $httpBackend.expectPOST(AUTH_URLS.loginUrl, {
                username: 'john',
                password: '5f4dcc3b5aa765d61d8327deb882cf99'
            }).respond(200, failureResponse);

            auth.login(invalidCredentials).then(function (res) {
                
            }).catch(function(e) {
                expect(e.error).to.equal('Invalid username or password');
            });
            $httpFlush();
        });

        it('should set valid session on successful authentication', function () {
            auth.login(credentials).then(function (res) {
                expect(res.sessionId).not.to.equal(undefined);
            });
            $httpFlush();
        });
    });

    describe('logout function', function() {
        it('should exists', function() {
            expect(auth.logout).to.be.defined;
        });
        
        it('get success status on logout', function() {
            auth.logout().then(function(res) {
                expect(res.status).to.equal('success');
            });
            $httpFlush();
        });
    });

    describe('isAuthenticated', function() {

        beforeEach(function() {
            sinon.spy($rootScope, '$broadcast');
        });

        it('should exists', function() {
            expect(auth.isAuthenticated).to.be.defined;
        });

        it('after login user should be authenticated', function() {
            auth.login(credentials).then(function (res) {
                session.create(res);
                expect(auth.isAuthenticated()).to.be.equal(true);
            });
            $httpFlush();
        });

        it('after logout user should not be authenticated', function() {
            auth.logout().then(function (res) {
                session.destroy();
                expect(auth.isAuthenticated()).not.to.be.equal(true);
            });
            $httpFlush();
        });
    });
});