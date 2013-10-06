WAMS demo assets 
================
This repository contains all the source code from my demo about Azure Mobile Services at Dev4Devs 2013.

You can also <a href="https://speakerdeck.com/faniereynders/create-a-scalable-and-secure-backend-for-your-apps-using-azure-mobile-services">View slides here</a> over at SpeakerDeck.

Contents of Demo
------------------------
The demo consists of a Mobile Service that:
- uses a Scheduler that polls Twitter every 15 minutes for tweets containing #Dev4Devs
- exposes an custom api that reads tweets from the table and presents a <a href="http://msdn.microsoft.com/en-us/library/windows/apps/hh761491.aspx">live tile catalog</a> in XML to be called by the sample app
- allows social sign on with Twitter
The sample app uses the Mobile Services client (<a href="http://www.nuget.org/packages/WindowsAzure.MobileServices.WinJS/">downloaded via Nuget here</a>) to connect to the service for consuming tweets, login with Twitter, and live tile catalog via the service

The <i>services</i> folder contains all the Mobile Services code and the sample WinRT app is contained in the <i>app</i> folder.

Disclaimer
----------
The source code is freely available to anyone. The code was written only for demo purposes and I do not accept any responsibility for any of its usage.
