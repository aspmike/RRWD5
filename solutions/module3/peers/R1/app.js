(function () {

  angular.module("NarrowItDownApp", [])
  .controller("NarrowItDownController", NarrowItDownController)
  .service("MenuSearchService", SearchService)
  .directive("foundItems", FoundItemsDirective);


  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItemsList.html',
      scope: {
        foundItemsProp: '<foundItemsAttr',
        onRemove: '&',
        errorMessage: '<errorMsg'
      }
    }

    return ddo;
  }


  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(SearchService) {
    var narrowCtrl = this;

    narrowCtrl.found = new Array();
    narrowCtrl.search = "";
    narrowCtrl.errorMessage = "";

    narrowCtrl.getItems = function() {
      var promise = SearchService.getMatchedMenuItems(narrowCtrl.search);
      promise.then(function(result) {
        narrowCtrl.found = result;
        if(narrowCtrl.found.length === 0) {
          narrowCtrl.errorMessage = "Nothing found.";
        }
        else {
          narrowCtrl.errorMessage = "";
        }
      })
    };

    narrowCtrl.remove = function(index) {
      SearchService.removeItem(index, narrowCtrl.found);
    };



  }

  SearchService.$inject = ['$http'];
  function SearchService(httpService) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return httpService({
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
      }).then(function(result) {
        var foundItems = new Array();
        for(var i = 0; i < result.data.menu_items.length; i++) {
          if(result.data.menu_items[i].description.indexOf(searchTerm) !== -1) {
            foundItems.push(result.data.menu_items[i]);
          }
        }
        return foundItems;
      });
    }

    service.removeItem = function(index, list) {
      list.splice(index, 1);
    }

  }



})();
