# zuido

[![Build Status](https://travis-ci.org/miya0001/zuido.svg?branch=master)](https://travis-ci.org/miya0001/zuido)
[![npm version](https://badge.fury.io/js/zuido.svg)](https://badge.fury.io/js/zuido)

`zuido` is a command line tool that allows you to connect your local development environment from public URLs with ngrok and simple reverse proxy.

The proxy server in this command will change the URLs in your HTML to the public URL that is supplied by ngrok.

https://ngrok.com/

Do you want to test your WordPress with mobile? Zuido allows you to do it with zero configuration.

"zuido" means "tunnel" in Japanese. :)

## Requires

* Node 8.x or later
* macOS, Unix/Linux

## Usage

```
$ zuido --help

  Usage: zuido [options] <URL>

  Options:

    -V, --version            output the version number
    --subdomain <subdomain>  Custom subdomain.
    --region <region>        ngrok server region. [us, eu, au, ap] (default: us)
    --proxy <port>           The port number for the reverse proxy.
    --config <file>          Path to config files
    -h, --help               output usage information
```

## OPTIONS

### URL

The URL like `http://localhost:8080`, `http://192.168.33.10/hello/world` or so.

```
$ zuido http://localhost:8080/
```

### subdomain

Optional. subdomain name to request. If unspecified, uses the tunnel name.

```
$ zuido http://localhost:8080/ --subdomain=xxxx
```

Free plan user can't use subdomain.
https://ngrok.com/pricing

### region

Optional. The location of the datacenter for ngrok. The default value is `us`.

* us - United States (Ohio)
* eu - Europe (Frankfurt)
* ap - Asia/Pacific (Singapore)
* au - Australia (Sydney)

```
$ zuido http://localhost:8080/ --region=ap
```

### proxy

Optional. The port number for the reverse proxy in this command. The default value is `5000`.

```
$ zuido http://localhost:8080/ --proxy=3000
```

### config

Optional. Path to the config file for the ngrok.

```
$ zuido http://localhost:8080/ --config=/path/to/ngrok.yml
```

See documentation for ngrok.
https://ngrok.com/docs#config

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

You can pass full url like following.

```
$ zuido http://example.com/path/to/app?hello=world
```

In this case, new URL will be `http://xxxxxxxx.ngrok.io/path/to/app?hello=world`.

## How to install

```
$ npm install -g zuido
```

## Contributing

```
$ git clone git@github.com:miya0001/zuido.git
$ cd zuido && npm install
$ npm test
```
