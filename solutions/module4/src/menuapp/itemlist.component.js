(function () {
  'use strict'

  angular.module('MenuApp')
  .component('itemList', {
    templateUrl: 'src/menuApp/templates/itemlist.template.html',
    bindings: {
      itemlist: '<'
    }
  })
})()
