(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['RegistrationService', 'MenuService'];
function SignUpController(RegistrationService, MenuService) {
  var reg = this;
  reg.favInvalid = false;

  reg.submit = function () {
    MenuService.getMenuItem(reg.user.favdish).then(function(response){
      console.log("Submit accepted!" + reg.user);
      RegistrationService.setPreference(reg.user);
      reg.favInvalid = false;
      reg.registered = true;
    }, function(err) {
      console.log("No such item!" + reg.user.favdish)
      reg.favInvalid = true;
    }
    )
  };

}

})();
