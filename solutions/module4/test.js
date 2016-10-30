(function () {
'use strict';

angular.module('data')
.controller('TestController', TestController);


TestController.$inject = ['MenuDataService'];
function TestController(MenuDataService) {
  var testCtrl = this;
  testCtrl.list = MenuDataService.getAllCategories();
  console.log(testCtrl.list);
}

})();
