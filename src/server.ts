import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import forceDomain from 'forcedomain';
import compression from 'compression';
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import { AppServerModuleNgFactory } from '../dist/ngfactory/src/app/app.server.module.ngfactory';
import * as express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';


const PORT = process.env.PORT || 4200;
const env = process.env.NODE_ENV || 'development';

enableProdMode();

const app = express();

if (env !== 'development') {
  app.use(forceDomain({
    hostname: 'jessicajaniuk.com',
    protocol: 'https'
  }));
}
app.use(compression());

const template = readFileSync(join(__dirname, '..', 'dist', 'index.html')).toString();

app.engine('html', (_, options, callback) => {
  const opts = { document: template, url: options.req.url };

  renderModuleFactory(AppServerModuleNgFactory, opts)
    .then(html => callback(null, html));
});

app.set('view engine', 'html');
app.set('views', 'src');

app.get('*.*', express.static(join(__dirname, '..', 'dist')));

app.get('*', (req, res) => {
  res.render('index', { req });
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}!`);
});
