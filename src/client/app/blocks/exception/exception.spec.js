/* jshint -W117, -W030 */
describe('exception service', function() {
    beforeEach(function() {
        bard.appModule('blocks.exception');
        bard.inject(this, 'exception', '$q', 'logger');
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('exception', function() {
        it('should exists', function() {
            expect(exception).to.be.defined;
        });

        describe('catcher function', function() {
            it('should exists', function() {
                expect(exception.catcher).to.be.defined;
            });

            it('should return a function', function() {
                expect(exception.catcher('XHR failed for getVideos')).to.be.a.function;
            });
        });
    });
});