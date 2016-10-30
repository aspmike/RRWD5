(function () {
  'use strict'

  angular.module('MenuApp')
  .component('categoryList', {
    templateUrl: 'src/menuApp/templates/categorylist.template.html',
    bindings: {
      catlist: '<'
    }
  })
})()
