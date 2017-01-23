// server.js
const express = require('express');
const path = require('path');
const app = express();
// Gzip
const compression = require('compression');

// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Instruct the app
// to use the forceSSL
// middleware
// app.use(forceSSL());
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
