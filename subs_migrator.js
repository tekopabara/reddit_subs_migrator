'use strict';
const snoowrap = require('snoowrap');

// Create an app for the old account: https://ssl.reddit.com/prefs/apps/
const readAPI = new snoowrap({
  userAgent: 'Subreddits importer script',
  clientId: '14 chars under app name',
  clientSecret: 'app secret',
  username: 'old account username',
  password: 'old account password'
});

// Create an app for the new account: https://ssl.reddit.com/prefs/apps/
const writeAPI = new snoowrap({
  userAgent: 'Subreddits importer script',
  clientId: '14 chars under app name',
  clientSecret: 'app secret',
  username: 'new account username',
  password: 'new account password'
});

readAPI.getSubscriptions({ limit: 1000 }).then(listing => {
  listing.forEach(element => {
    console.log("Subscribing to \'" + element.display_name + "\'");
    writeAPI.getSubreddit(element.display_name).subscribe();
  });
  console.log("Subscribed to " + listing.length + " elements")
});
