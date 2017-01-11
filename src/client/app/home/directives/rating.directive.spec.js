/* jshint -W117, -W030 */
/* jshint multistr:true */
describe.only('rating directive: ', function () {
    var el;
    var scope;

    beforeEach(module('app.home', bard.fakeToastr));

    beforeEach(function () {
        bard.inject(this, '$compile', '$rootScope');
        el = angular.element('<rating-element ng-model="score" on-rating="onRating({score: score})"></rating-element>');

        // ng's $compile service resolves nested directives (there are none in this example)
        // and binds the element to the scope (which must be a real ng scope)
        scope = $rootScope.$new();
        scope.score = 5;
        $compile(el)(scope);

        // tell angular to look at the scope values right now
        $rootScope.$digest();
    });

    /* tests
    ************************************************ **/
    describe('after including the directive', function () {

        it('should have rating-element class', function () {
            expect(el.hasClass('rating-element')).to.be.true;
        });

        it('should have ng-model attribute set to \'score\'', function () {
            expect(el.attr('ng-model')).to.equal('score');
        });

        it('should have score value 5', function () {
            expect(el.isolateScope().score).to.equal(5);
        });

        describe('un-ordered list on directive', function () {

            it('should be present', function () {
                expect(el.find('ul')).to.have.length(1);
            });

            describe('list elements on directive', function () {

                beforeEach(function () {
                    var directiveScope = el.isolateScope();
                    sinon.stub(directiveScope, 'toggle').withArgs(1);
                    sinon.stub(directiveScope, 'updateRating');
                });

                it('should have 5 list elements', function () {
                    expect(el.find('li')).to.have.length(5);
                });

                it('should call toggle method on click', function () {
                    var li = el.find('li').eq(0);
                    li.triggerHandler('click');
                    expect(el.isolateScope().toggle).to.have.been.calledOnce;
                });

                it('should call updateRating method on score change', function () {
                    scope.score--;
                    scope.$digest();
                    expect(el.isolateScope().updateRating).to.have.been.calledOnce;
                });

            });
        });

        describe('toggle method', function() {

            it('should exits', function() {
                expect(el.isolateScope().toggle).to.defined;
            });

            it('should change score value', function() {
                el.isolateScope().toggle(2);
                expect(el.isolateScope().score).to.equal(3);
            });

        });
    });

});