var mobileService = new WindowsAzure.MobileServiceClient("https://<service-url>.azure-mobile.net/", "<app-key>");
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

var userId;
var login = function () {
    return new WinJS.Promise(function (complete) {
        //make sure to add the consumer key and secret on the identity section on WAMS!
        mobileService.login('twitter').done(function (results) {
            //load results
            var message = "You are now logged in";
            var dialog = new Windows.UI.Popups.MessageDialog(message);
            dialog.showAsync()
                  .done(complete);
            refreshFeed();
        }, function (error) {
            userId = null;
            var dialog = new Windows.UI.Popups.MessageDialog("An error occurred during login", "Login Required");
            dialog.showAsync()
                  .done(complete);
        });
    });
}
var authenticate = function () {
    login().then(function () {
        if (userId === null) {
            authenticate();
        }
    });
}

var notifications = Windows.UI.Notifications;
var recurrence = notifications.PeriodicUpdateRecurrence.halfHour;
var url = new Windows.Foundation.Uri(mobileService.applicationUrl, "/api/tiles");

notifications.TileUpdateManager.createTileUpdaterForApplication().startPeriodicUpdate(url, recurrence);

