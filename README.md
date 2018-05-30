# zuido

[![Build Status](https://travis-ci.org/miya0001/zuido.svg?branch=master)](https://travis-ci.org/miya0001/zuido)
[![npm version](https://badge.fury.io/js/zuido.svg)](https://badge.fury.io/js/zuido)

`zuido` is a command line tool that allows you to connect your local development environment from public URLs with ngrok and simple reverse proxy.

The proxy server in this command will change the URLs in your HTML to the public URL that is supplied by ngrok.

https://ngrok.com/

"zuido" means "tunnel" in Japanese. :)

## Requires

* Node 8.x or later

## Usage

```
$ zuido --help
Usage: zuido <URL> [--subodomain=<subdomain>] [--region=<region>] [--proxy=<port>] [--config=<config>]
```

## OPTIONS

### URL

The URL like `http://localhost:8080`, `http://192.168.33.10/` or so.

### subdomain

Optional. subdomain name to request. If unspecified, uses the tunnel name.

### region

Optional. The location of the datacenter for ngrok. The default value is `us`.

* us - United States (Ohio)
* eu - Europe (Frankfurt)
* ap - Asia/Pacific (Singapore)
* au - Australia (Sydney)

### proxy

Optional. The port number for the reverse proxy in this command. The default value is `5000`.

### config

Optional. Path to the config file for the ngrok.

## Examples

Forwards public URL (e.g, `https://xxxxxxxx.ngrok.io`) to `http://localhsot:8080` and open your browser.

```
$ zuido http://localhsot:8080
```

If you are payed user of the ngrok, you can choose ngrok's subdomain like following.

```
$ zuido --subdomain=zuido http://localhsot:8080
```

The proxy server on this command will run on port 5000, you can change the port.
```
$ zuido --proxy=3000 http://localhsot:8080
```

## How to install

```
$ npm install -g zuido
```

## Configuration

See documentation for ngrok.

https://ngrok.com/docs#config
