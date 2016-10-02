(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController ($scope) {
  $scope.lunchmenu = "";

  $scope.checkIfTooMuch = function () {
    var items = [];
    var message = "";
    var lunchmenu = $scope.lunchmenu;
    if (lunchmenu==="") {
      message = "Please enter data first";
    } else {
      items = lunchmenu.split(',');
      if (items.length > 3) {
        message = "Too much!";
      } else {
        message = "Enjoy!";
      }
    }
    $scope.message = message;
  };

}

})();
