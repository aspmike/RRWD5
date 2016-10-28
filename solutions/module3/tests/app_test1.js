(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController ', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', foundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;

  var promise = MenuSearchService.getMatchedMenuItems();

  promise.then(function (response) {
    // menu.categories = response.data;
    console.log(response.data);
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  // narrow.getItems = function() {
  //     narrow.found = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
  // }
}

function foundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundItems: '<',
      onRemove: '&'
    }
    // ,
    // controller: NarrowItDownController,
    // controllerAs: 'narrow',
    // bindToController: true
  };

  return ddo;
}



MenuSearchService.$inject=['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service=this;

  service.getMatchedMenuItems = function(/*searchTerm*/) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;

    // return response.then(function(result){
    //   // process result and only keep items that match
    //   var foundItems = result.data;

//      for (var item in foundItems) {
//        if (item.description.search(searchTerm)) {
//          foundItems
//        }
//      }
    //   console.log(foundItems);
    //
    //   // return processed items
    //   return foundItems;
    // });
  }
}



})();
