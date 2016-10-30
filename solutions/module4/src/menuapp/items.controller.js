(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['$stateParams','items'];
function ItemsController($stateParams, items) {
  var itemsCtrl = this;
  itemsCtrl.items = items;
  itemsCtrl.category = $stateParams.categoryShortName;
  console.log('itemsCtrl.items=', itemsCtrl.items);
  console.log('itemsCtrl.category=', itemsCtrl.category);
}

})();
