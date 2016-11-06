(function(){
"use strict";

var serv = angular.module('app')
.service('dataService', function(){
	var service = this;
	var shopStocks = [
						{
							id: 1,
							name: 'Bismol Pepto',
							category: 'Medicine',
							quantity: 10
						},
						{
							id: 2,
							name: 'Cookie',
							category: 'food',
							quantity: 3
						},
						{
							id: 3,
							name: 'Chips',
							category: 'food',
							quantity: 4
						},
						{
							id: 4,
							name: 'Donut',
							category: 'food',
							quantity: 7
						},
						{
							id: 5,
							name: 'Croisant',
							category: 'food',
							quantity: 1
						}
					];
	var boughtList = [];
	
	 service.getShopItems = function() {
		return shopStocks;
	};
	
	service.getBoughtList = function() {
		return boughtList;
	};
	
	service.addBoughtItem = function(itemToBuy){
		boughtList.push(itemToBuy);
	};
	
	service.removeBoughtItem = function(itemToRemove){
		boughtList.splice(boughtList.indexOf(itemToRemove), 1);
	};
	
	service.addShopItem = function(itemToBuy){
		shopStocks.push(itemToBuy);
	};
	
	service.removeShopItem = function(itemToRemove){
		shopStocks.splice(shopStocks.indexOf(itemToRemove), 1);
	};
	
	
});

return serv;

})();