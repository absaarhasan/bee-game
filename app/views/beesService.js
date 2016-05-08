'use strict';

beesService.$inject = ['$http', '$timeout', '$filter', '$window'];

function beesService($http, $timeout ,$filter ,$window) {


    var service = {
        bees: { data: [] },
        targetBee : { data: [] },
        killbee: killbee,
        init: getBees
    };

    return service;

    function getBees(){

        return $http.get('/app/assets/json/data.json').then(function(response){

            service.bees.data = response.data;

        })

    }

    function killbee(){

        var liveBees = [];

        angular.forEach(service.bees.data, function(bee, key) {

            if(bee.status == "alive"){

                this.push(bee);
            }

        }, liveBees);

        var totalBees = liveBees.length;

        if (totalBees > 0) {

            var randomNumber = Math.floor(Math.random() * totalBees);

            var targetBee = liveBees[randomNumber];

            service.targetBee.data = targetBee.id;

            $timeout(function() {
                service.targetBee.data = 0;
            }, 100);

            var energyLevel = targetBee.energy - targetBee.hit;

            var target = $filter('filter')(service.bees.data, {id: targetBee.id})[0];

            if (energyLevel <= 0 && target.name == "Queen Bee") {

                angular.forEach(service.bees.data, function(bee, key) {

                    bee.status = "dead";
                    bee.energy = 0;

                });



            } else if (energyLevel <= 0 ){

                target.status = "dead";
                target.energy = 0;

            }else{

                target.energy = energyLevel;
            }
        } else {

            $window.alert("GAME OVER!!\nPlease refresh your browser to start again.")
        }



    }



}