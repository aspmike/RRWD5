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
      console.log(response.data);
      // narrow.found = [{name: "Michael", short_name: "mike", description: "some text"}];
      narrow.found = response.data.menu_items;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  }

}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      list: '<'
      // onRemove: '&'
    }
  };

  return ddo;
}



MenuSearchService.$inject=['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    console.log("searchTerm=", searchTerm);

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
  };
}

})();
