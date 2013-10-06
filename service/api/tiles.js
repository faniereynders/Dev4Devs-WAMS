var wns = require('wns');

exports.get = function(request, response) {
    var tweets = request.service.tables.getTable('Tweets');
    tweets.orderByDescending("twitterId")
          .take(6)
          .read({
            success: sendResponse
    });

function sendResponse(results) {
    var tileText = { };
    var i = 0;
    console.log(results)

    results.forEach(function(item) {
            tileText["image" + i + "src"] = item.photo;
        i++;
    });
    
    var r = Math.floor(Math.random() * 6);
    var item = results[r];
    tileText["image6src"] = item.photo;
    tileText["image6alt"] = 'alt="image next to text"';
    tileText["text1"] = item.author;
    tileText["text2"] = item.text;
        
    var xml = wns.createTileWidePeekImageCollection05(tileText);
    response.set('content-type', 'application/xml');
    response.send(200, xml);
}

};
