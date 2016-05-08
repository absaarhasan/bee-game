'use strict';

(function() {

    angular.module('game', [])
        .controller('GameCtrl',  GameCtrl)
        .factory('beesService',  beesService)
        .config(['$stateProvider', function($stateProvider) {

            $stateProvider

                .state('game', {
                    url: '/',
                    controller: 'GameCtrl',
                    templateUrl: "views/bees.html",
                    controllerAs: 'vm',
                    resolve: {
                        beesService: beesService
                    }
                })

        }]);


})();

GameCtrl.$inject = [ 'beesService'];

function GameCtrl(beesService) {

    var vm = this;


    vm.bees = beesService.bees;
    vm.targetBee = beesService.targetBee;

    vm.killbee = beesService.killbee;

    beesService.init()


}