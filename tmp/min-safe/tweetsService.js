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