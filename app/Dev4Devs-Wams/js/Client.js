var mobileService = new WindowsAzure.MobileServiceClient("https://dev4devs-wams.azure-mobile.net/", "zBAZEWCCEIdzETdtiEQInUVaNuXaTS18");
var feed = mobileService.getTable('Tweets');

var refreshFeed = function () {
    feed.orderByDescending("twitterId")
        .take(50)
        .read()
        .done(function (results) {
            var feedItems = new WinJS.Binding.List(results);
            feedList.winControl.layout = new WinJS.UI.GridLayout({ groupHeaderPosition: "top" });
            feedList.winControl.itemDataSource = feedItems.dataSource;
        });
};