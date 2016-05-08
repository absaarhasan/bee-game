'use strict';

(function() {

  angular.module('bee', ['ui.router', 'game'])

      .config(['$urlRouterProvider' ,function( $urlRouterProvider) {

            $urlRouterProvider.otherwise("/");

      }])


})();



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
'use strict';

(function() {

    angular.module('tt.tweets', [])
        .controller('TweetsCtrl',  TweetsCtrl)
        .factory('tweetsService',  tweetsService)
        .config(['$stateProvider', function($stateProvider) {

            $stateProvider

                .state('tweets', {
                    url: '/',
                    controller: 'TweetsCtrl',
                    templateUrl: "views/tweets.html",
                    controllerAs: 'vm',
                    resolve: {
                        tweets: tweetsService
                    }
                })

        }]);


})();

TweetsCtrl.$inject = [ 'tweets'];

function TweetsCtrl(tweets) {

    var vm = this;

    vm.tweets = tweets;

    console.log(vm.tweets)
}
'use strict';

tweetsService.$inject = ['$http'];

function tweetsService($http) {

    return $http.get('/app/assets/json/data.json').then(function(response){

        var tweets = [];

        for (var key in response.data) {
            if (response.data.hasOwnProperty(key)) {

                var tweet = {};
                var d = new Date(response.data[key].created_at);

                tweet.date = d.getDate() + " " + d.toLocaleString("en-us", { month: "short" })
                tweet.msg = response.data[key].text
                tweet.username = response.data[key].user.name;
                tweet.handle = response.data[key].user.screen_name;
                tweet.thumb = response.data[key].user.profile_image_url;

                tweets.push(tweet)
            }
        }

        return tweets;

    })

}