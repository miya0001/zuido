'use strict';

const url = require('url');

exports.getArgs = (program, callbak) => {
  const args = {};

  if (program.httpServer) {
    program.args[0] = 'http://127.0.0.1:8080'
  }

  if (program.args.length) {
    try {
      const origin = url.parse(program.args[0]);
      if (null === origin.protocol) {
        return callbak();
      } else {
        args.origin = `${origin.protocol}//${origin.host}`;
        args.url = program.args[0];
        args.regex = new RegExp(`https?://${origin.host}`, 'ig');
      }
    } catch(e) {
      return callbak();
    }
  } else {
    return callbak();
  }

  if (program.subdomain) {
    args.subdomain = program.subdomain;
  }

  if (program.proxy) {
    args.proxy = program.proxy;
  } else {
    args.proxy = 5000;
  }

  if (program.region) {
    args.region = program.region;
  }

  if (program.config) {
    args.config = program.config;
  } else {
    args.config = `${process.env.HOME}/.ngrok2/ngrok.yml`;
  }

  return args;
}

exports.error = (message) => {
  console.log(`\u001b[31mError: ${message}\u001b[0m`);
  process.exit(1);
}
