'use strict';

(function() {

  angular.module('bee', ['ui.router', 'game'])

      .config(['$urlRouterProvider' ,function( $urlRouterProvider) {

            $urlRouterProvider.otherwise("/");

      }])


})();


