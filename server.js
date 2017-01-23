// server.js
const express = require('express');
const path = require('path');
const app = express();
// Gzip
const compression = require('compression');

app.use(compression());

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/.well-known/acme-challenge/:content', function(req, res) {
  res.send('4DCEYoMLA_qP9OzEQGc5a--jVwL-6TWgWthtuvRcl0o')
})
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.all('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
