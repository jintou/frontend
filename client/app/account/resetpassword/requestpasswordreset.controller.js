'use strict';

class RequestResetPasswordController{
   constructor(ngDialog){
       this.email = '';
       this.ngDialog = ngDialog;
   };

   submit(){
      this.ngDialog.open({template: '<p>An Email will send to your to reset yout password</p>',
              plain: true,
      className: 'ngdialog-theme-default' });
   };
}


angular.module('billynApp').controller('RequestResetPasswordController', RequestResetPasswordController);
