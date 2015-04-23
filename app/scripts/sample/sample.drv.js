// sample.drv.js

'use strict';

angular.module('simpleNote').directive('sampleDirective', function () {
  return {
    restrict: 'E',
    templateUrl: 'sample/sample.drv.html'
  };
});
