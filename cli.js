#!/usr/bin/env node

'use strict';

const http = require('http'),
    httpProxy = require('http-proxy'),
    modifyResponse = require('http-proxy-response-rewrite'),
    ngrok = require('ngrok'),
    opn = require('opn'),
    pkg = require('./package.json');

const argv = require('minimist')(process.argv.slice(2));

const origin = argv._[0].replace(/\/$/, '');
const subdomain = argv.subdomain;

connectNgrok().then(client => {
  const proxy = httpProxy.createProxyServer({
    target: origin,
    changeOrigin: true,
  });

  proxy.on('proxyRes', (proxyRes, req, res) => {
    if (proxyRes.headers['content-type'] && proxyRes.headers['content-type'].match(/text\/html/i)) {
      delete proxyRes.headers['content-length'];
      modifyResponse(res, proxyRes.headers['content-encoding'], body => {
        if (body) {
          body = body.replace(new RegExp(origin, 'ig'), client.url.replace(/\/$/, ''));
        }
        return body;
      });
    }
  });

  http.createServer((req, res) => {
    try {
      proxy.web(req, res);
    } catch(e) {
      console.log('\u001b[31mError: Please check URL and try again.\u001b[0m')
      process.exit(1);
    }
  }).listen(5000);

  console.log('\u001b[36mzuido v\u001b[0m by \u001b[36mTakayuki Miyauchi (@miya0001)');
  console.log('\u001b[32mWeb Interface: \u001b[0m' + origin);
  console.log('\u001b[32mForwarding: \u001b[0m' + client.url + ' -> ' + origin);
  console.log('');
  console.log('\u001b[0m(Ctrl+C to quit)')

  opn(client.url);
}).catch(function (error) {

});

async function connectNgrok() {
  const client = {}

  client.url = await ngrok.connect({
    proto: 'http',
    addr: 5000,
    configPath: process.env.HOME + '/.ngrok2/ngrok.yml',
    subdomain: subdomain,
  });

  return client;
}
