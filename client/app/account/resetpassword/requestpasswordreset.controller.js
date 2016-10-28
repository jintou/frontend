'use strict';

class RequestResetPasswordController {
  constructor($http, ngDialog) {
    this.email = '';
    this.ngDialog = ngDialog;
    this.$http = $http;
  };

  submit() {
    var vm = this;

    vm.$http({
      method: 'POST',
      url: 'http://localhost:9000/requestresetpassword',
      data: { email: this.email }
    }).then(function (response) {
      vm.ngDialog.open({
        template: response.data,
        plain: true,
        className: 'ngdialog-theme-default'
    });

    });

  };
}


angular.module('billynApp').controller('RequestResetPasswordController', RequestResetPasswordController);
