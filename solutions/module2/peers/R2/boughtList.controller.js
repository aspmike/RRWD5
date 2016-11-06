(function(){
"use strict";

var ctrl = angular.module('app')
.controller('boughtListController', function(dataService){
	var vm = this;
	vm.selectedBoughtItem = [];
	vm.boughtList = [];
	
	var init = function(){
		vm.boughtList =  dataService.getBoughtList();
	}
	
	vm.boughtItemChecked = function (isChecked, item){
		if(isChecked){
			vm.selectedBoughtItem.push(item);
		}else{
			vm.selectedBoughtItem.splice(vm.selectedShopItem.indexOf(item), 1);
		}
	}
	
	vm.moveLeft = function(){
		for (var i = 0; i < vm.selectedBoughtItem.length; i++){
				dataService.addShopItem(vm.selectedBoughtItem[i]);
				dataService.removeBoughtItem(vm.selectedBoughtItem[i]);
		}
		vm.selectedBoughtItem = [];		
		vm.btnGrpBought = {};
	}
	
	init();
});

ctrl.$inject = ['dataService'];

return ctrl;

})();