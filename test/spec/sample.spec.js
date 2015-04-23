'use strict';

describe('Sample test for setting up development framework', function () {
  it('should be ok', function () {
    expect(true).to.equal(true);
  });

  describe('Directive: sample-directive', function () {
    var $compile;
    var scope;

    beforeEach(module('simpleNote'));

    beforeEach(module('templates'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      scope = _$rootScope_.$new();
    }));

    it('gets the appropriate content', function () {
      var element = $compile('<sample-directive></sample-directive>')(scope);
      scope.$digest();
      expect(element.html()).to.contain('<h1>Sample</h1>');
    });
  });
});
