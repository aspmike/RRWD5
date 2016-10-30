(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);


CategoriesController.$inject = ['catlist'];
function CategoriesController(catlist) {
  var catCtrl = this;
  catCtrl.catlist = catlist;
}

})();
