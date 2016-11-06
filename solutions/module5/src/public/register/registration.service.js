(function () {
angular.module('public')
.service('RegistrationService',RegistrationService);

var user = null;

function RegistrationService() {
  var service = this;

  service.setPreference = function(newuser) {
      user = newuser;
  }

  service.getPreference = function() {
    return user;
  }


}

})();
