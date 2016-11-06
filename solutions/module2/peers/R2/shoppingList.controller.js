(function(){
"use strict";

var ctrl = angular.module('app')
.controller('shoppingListController', function(dataService){
	var vm = this;
	vm.selectedShopItem = [];
	vm.shopItems = [];
	
	var init = function(){
		vm.shopItems = dataService.getShopItems();
	}
	
	vm.shopItemChecked = function (isChecked, item){
		if(isChecked){
			vm.selectedShopItem.push(item);
		}else{
			vm.selectedShopItem.splice(vm.selectedShopItem.indexOf(item), 1);
		}
	}
	
	vm.moveRight = function(){
		for (var i = 0; i < vm.selectedShopItem.length; i++){
				dataService.addBoughtItem(vm.selectedShopItem[i]);
				dataService.removeShopItem(vm.selectedShopItem[i]);
		}
		vm.selectedShopItem = [];
		vm.btnGrpShop = {};
	}
	
	init();
});

ctrl.$inject = ['dataService'];

return ctrl;

})();