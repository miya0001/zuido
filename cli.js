#!/usr/bin/env node

'use strict';

const http = require('http'),
    httpProxy = require('http-proxy'),
    modifyResponse = require('http-proxy-response-rewrite'),
    ngrok = require('ngrok'),
    opn = require('opn'),
    pkg = require('./package.json');

const help = () => {
  console.log('Usage: zuido <URL> [--subodomain=<subdomain>] [--region=<region>] [--proxy=<port>]')
}

const defaults = {
  "proxy": 5000,
}

const argv = require('minimist')(process.argv.slice(2), {
  default: defaults,
});

if ((true === argv.h) || (true === argv.help)) {
  help();
  process.exit(0);
}

if (0 === argv._.length) {
  help();
  process.exit(1);
}

const option = {
  origin: argv._[0].replace(/\/$/, ''),
  subdomain: argv.subdomain,
  proxy: argv.proxy,
  region: argv.region
}

if (0 === parseInt(option.port)) {
  option.port = defaults.port;
}

connectNgrok().then((client) => {
  const proxy = httpProxy.createProxyServer({
    target: option.origin,
    changeOrigin: true,
  });

  proxy.on('proxyRes', (proxyRes, req, res) => {
    if (proxyRes.headers['content-type'] && proxyRes.headers['content-type'].match(/text\/html/i)) {
      delete proxyRes.headers['content-length'];
      modifyResponse(res, proxyRes.headers['content-encoding'], (body) => {
        if (body) {
          body = body.replace(new RegExp(option.origin, 'ig'), client.url.replace(/\/$/, ''));
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
  }).listen(argv.proxy);

  console.log(`\u001b[36mzuido v${pkg.version}\u001b[0m by \u001b[36mTakayuki Miyauchi (@miya0001)`);
  console.log('\u001b[32mWeb Interface: \u001b[0m' + 'http://localhost:4040');
  console.log(`\u001b[32mForwarding: \u001b[0m${client.url} -> ${option.origin}`);
  console.log('\u001b[0m(Ctrl+C to quit)')

  opn(client.url);
}).catch((error) => {
  console.log(error)
});

async function connectNgrok() {
  const client = {}
  const opts = {
    proto: 'http',
    addr: argv.proxy,
    configPath: `${process.env.HOME}/.ngrok2/ngrok.yml`,
  }

  if (option.subdomain) {
    opts.subdomain = option.subdomain;
  }

  if (option.region) {
    opts.region = option.region;
  }

  console.log(opts)

  client.url = await ngrok.connect(opts);

  return client;
}
