(function(){
  'use strict';
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('apiendpoint', 'https://davids-restaurant.herokuapp.com/menu_items.json')
  .directive('foundItems', foundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var ctrl = this;
    ctrl.searchTerm = "";
    ctrl.found = [];
    ctrl.empty = false;
    ctrl.getData = function(){
      ctrl.found = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
      if(ctrl.found.length == 0 || ctrl.searchTerm === ""){
        ctrl.empty = true;
        ctrl.found = [];
      } else {
        ctrl.empty = false;
      }
      // console.log(ctrl.found.length);
      // console.log(ctrl.found[0]);
      // console.log(ctrl.found[0].short_name);
    }
    ctrl.removeItem = function(index){
      ctrl.found.splice(index, 1);
    }
  }

  MenuSearchService.$inject = ['$http', 'apiendpoint'];
  function MenuSearchService($http, apiendpoint){
    var service = this;
    service.items = [];
    service.filteredItems = [];
    service.getMatchedMenuItems = function(searchTerm){
      // console.log(searchTerm);
      service.filteredItems = [];
      for(let item of service.items){
        if(item.description.indexOf(searchTerm) !== -1){
          service.filteredItems.push(item);
        }
      }
      // console.log(service.filteredItems.length);
      return service.filteredItems;
    }
    // gets all items as page loads
    $http({
      method: 'GET',
      url: apiendpoint
    }).then(function(result){
      service.items = result.data.menu_items;
      // console.log(service.items);
    });
  }

  function foundItemsDirective(){
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'ctrl',
      bindToController: true,
      restrict: 'E'
    };
    return ddo;
  }
})();
