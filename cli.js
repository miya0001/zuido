#!/usr/bin/env node

'use strict';

const http = require('http');
const httpProxy = require('http-proxy');
const modifyResponse = require('http-proxy-response-rewrite');
const ngrok = require('ngrok');
const opn = require('opn');
const fs = require('fs');
const program = require('commander');
const zuido = require('./lib/Zuido.js');
const pkg = require('./package.json');

program
  .version(pkg.version)
  .usage('[options] <URL>')
  .option('--subdomain <subdomain>', 'Custom subdomain.')
  .option('--region <region>', 'ngrok server region. [us, eu, au, ap] (default: us)')
  .option('--proxy <port>', 'The port number for the reverse proxy.', parseInt)
  .option('--config <file>', 'Path to config files')
  .parse(process.argv);

const args = zuido.getArgs(program);

connectNgrok().then((client) => {
  const update_hostname = (str) => {
    return str.replace(args.regex, client.url.replace(/\/$/, ''))
  }

  const proxy = httpProxy.createProxyServer({
    target: args.origin,
    changeOrigin: true,
    secure: false,
  });

  proxy.on('proxyRes', (proxyRes, req, res) => {
    if (proxyRes.headers['content-type'] && proxyRes.headers['content-type'].match(/text\/html/i)) {
      delete proxyRes.headers['content-length'];
      modifyResponse(res, proxyRes.headers['content-encoding'], (body) => {
        if (body) {
          body = update_hostname(body);
        }
        return body;
      });
    }
    if (proxyRes.headers['location']) {
      proxyRes.headers['location'] = update_hostname(proxyRes.headers['location']);
    }
  });

  http.createServer((req, res) => {
    try {
      proxy.web(req, res);
    } catch(e) {
      console.log('\u001b[31mError: Please check URL and try again.\u001b[0m')
      process.exit(1);
    }
  }).listen(args.proxy);

  console.log(`\u001b[36mzuido v${pkg.version}\u001b[0m by \u001b[36mTakayuki Miyauchi (@miya0001)`);
  console.log('\u001b[32mWeb Interface: \u001b[0m' + 'http://localhost:4040');
  console.log(`\u001b[32mForwarding: \u001b[0m${client.url} -> ${args.origin}`);
  console.log(`\u001b[32mConfig Path: \u001b[0m${args.config}`);
  console.log('\u001b[0m(Ctrl+C to quit)')

  opn(update_hostname(args.url));
}).catch((error) => {
  console.log(error);
  process.exit(1);
});

async function connectNgrok() {
  const client = {}
  const opts = {
    proto: 'http',
    addr: args.proxy,
  }

  try {
    fs.statSync(args.config);
    opts.configPath = args.config;
  } catch(err) {
    // nothing to do.
  }

  if (args.subdomain) {
    opts.subdomain = args.subdomain;
  }

  if (args.region) {
    opts.region = args.region;
  }

  client.url = await ngrok.connect(opts);
  client.opts = opts;

  return client;
}