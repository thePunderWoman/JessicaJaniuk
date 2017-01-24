// server.js
const express = require('express');
const path = require('path');
const app = express();
// Gzip
const compression = require('compression');
const forceDomain = require('forcedomain');
let env       = process.env.NODE_ENV || 'development';

if (env !== 'development') {
  app.use(forceDomain({
    hostname: 'jessicajaniuk.com',
    protocol: 'https'
  }));
}
app.use(compression());

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/.well-known/acme-challenge/:content', function(req, res) {
  res.send('v5wsZfb8qQjx4ZVV_ronI5LytXe3_lNn4uscRiFlCt8.FrWxj0SZ3Qo-l4MU6cFvWK3MTxxgej3rxf8yKX5qgds')
})
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.all('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
