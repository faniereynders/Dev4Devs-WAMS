var updatesTable = tables.getTable('Tweets');
var request = require('request');

var searchUrl = "https://api.twitter.com/1.1/search/tweets.json?q=%23Dev4Devs";    //search for #Dev4Devs
    
var consumerKey = 'dfb378kPBcl91sWUEcIfDw',
    accessToken= '32851865-XacTT9P8fdQBYerA6UCMV80geGyEGSu5VjoyLKrPk',
    consumerSecret = 'WcdLglqEkWGSJfDQR31IH2qpOWqEidZHPgG1XQHT8w',
    accessTokenSecret = 'k09JFV6dBNrFFypFLhOpS12BygAPUrCsuiC6uZw4';

function UpdateTweets() {   
    appendLastTweetId(searchUrl, twitterRequest);
    
}


function appendLastTweetId(url, callback){     //searchUrl, twitterRequest
    updatesTable.select('twitterId')
                .orderByDescending()
                .take(1)
                .read({
                    success: function (result){
                        if(result)   //if any results found
                            callback(url + '&since_id=' + result[0]);   //twitterRequest(url with since_id)
                        else
                            callback(url);                              //twitterRequest(url)
                    }
                });
}

function twitterRequest(url){  //modified url
    request.get(oAuthRequest(url), tweetsLoaded);   //request boject, callback on success
}

function oAuthRequest (url) {
    return {
        url: url,
        oauth: {
            consumer_key: consumerKey,
            consumer_secret: consumerSecret,
            token: accessToken,
            token_secret: accessTokenSecret
        }
    };
}

function tweetsLoaded (error, response, body) {     //refer to twitter api 1.1 docs
    if (!error && response.statusCode == 200) {
        var results = JSON.parse(body).statuses;   

        if(results){
            console.log('Fetched new results from Twitter');

            results.forEach(function (tweet){

                    var update = {
                        twitterId: tweet.id,
                        text: tweet.text,
                        author: tweet.user.screen_name,
                        date: tweet.created_at,
                        photo: tweet.user.profile_image_url.replace("_normal","")   //get the original uploaded image
                    };
                    
                    updatesTable.insert(update);

            });
        }            
        else
            console.error('Could not contact Twitter');
    }
}
