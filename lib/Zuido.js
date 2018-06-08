'use strict';

const url = require('url');

exports.getArgs = function(program) {
  const args = {};

  if (program.args.length) {
    try {
      const origin = url.parse(program.args[0]);
      if (null === origin.protocol) {
        program.outputHelp();
        process.exit(1);
      } else {
        args.origin = `${origin.protocol}//${origin.host}`;
        args.url = program.args[0];
      }
    } catch(e) {
      program.outputHelp();
      process.exit(1);
    }
  } else {
    program.outputHelp();
    process.exit(1);
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
