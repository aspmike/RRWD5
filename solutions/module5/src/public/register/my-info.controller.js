(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['RegistrationService', 'MenuService'];
function MyInfoController(RegistrationService, MenuService) {
  var info = this;

  info.user  = RegistrationService.getPreference();
  if (info.user) {
    MenuService.getMenuItem(info.user.favdish).then(function(response){
      info.item = response;
      console.log('info: ' + JSON.stringify(response));
      info.registered = true;
    });
  } else {
    info.registered = false;
  }

  // info.user  = RegistrationService.getPreference();
  // console.log("Info.user=" + JSON.stringify(info.user));
  //
  // if (info.user) {
  //   info.registered = true;
  //   info.item = MenuService.getMenuItem(info.user.favdish);
  // } else {
  //   info.registered = false;
  // }
}

})();
