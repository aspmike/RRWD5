(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController (ShoppingListCheckOffService) {
  var tobuy = this;

  tobuy.items = ShoppingListCheckOffService.getTobuyItems();

  tobuy.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };

  tobuy.isEmpty = function() {
    return ShoppingListCheckOffService.tobuyIsEmpty();
  };

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController (ShoppingListCheckOffService) {
  var bought = this;

  bought.items = ShoppingListCheckOffService.getBoughtItems();

  bought.isEmpty = function() {
    return ShoppingListCheckOffService.boughtIsEmpty();
  };
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var tobuyItems = [
        { name: "cookies", quantity: 10 },
        { name: "beer", quantity: 3 },
        { name: "chips", quantity: 5 },
        { name: "chocolate", quantity: 2 },
        { name: "pop", quantity: 4 },
        { name: "wine", quantity: 2 }
      ],
      boughtItems = [];

  service.addBuyItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    tobuyItems.push(item);
  };

  service.buyItem = function (itemIndex) {
    // move bought Item from buyItems to boughtItems
    boughtItems.push(tobuyItems[itemIndex]);
    tobuyItems.splice(itemIndex, 1);
  };

  service.getTobuyItems = function () {
    return tobuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.boughtIsEmpty = function() {
    return boughtItems.length === 0;
  };

  service.tobuyIsEmpty = function() {
    return tobuyItems.length === 0;
  };

}


})();
