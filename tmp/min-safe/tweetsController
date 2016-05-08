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