(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;

  narrow.getMatchedMenuItems = function() {
    var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

    promise.then(function (response) {
      narrow.found = response;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  }

  narrow.removeItem = function (itemIndex) {
    console.log("Ctrl.removeItem", itemIndex);
    MenuSearchService.removeItem(itemIndex);
  }

  narrow.isEmpty = function() {
    // console.log("IsEmpty?");
    return MenuSearchService.isEmpty();
  }

}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      list: '<',
      onRemove: '&',
      isEmpty: '&'
    }
  };

  return ddo;
}



MenuSearchService.$inject=['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var found = [];

  service.getMatchedMenuItems = function(searchTerm) {
    found = [];
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      // process result and only keep items that match
      var foundItems = result.data.menu_items;
      if (searchTerm) {
        for (var i in foundItems) {
          if ((foundItems[i].description).toLowerCase().indexOf(searchTerm.toLowerCase())>=0) {
            found.push(foundItems[i]);
          };
        }
      } else {
        found = foundItems;
      }
      // return processed items
      return found;
  });
  }

  service.removeItem = function (itemIndex) {
    found.splice(itemIndex, 1);
  };

  service.isEmpty = function() {
    return found.length === 0;
  }

}

})();
