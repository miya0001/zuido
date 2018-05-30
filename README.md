# zuido

`zuido` is a command line tool that allows you to connect your local development environment from public URLs with ngrok and simple reverse proxy.

The proxy server in this command will change the URLs in your HTML to the public URL that is supplied by ngrok.

https://ngrok.com/

## Requires

* Node 8.x or later

## Usage

```
$ zuido --help
Usage: zuido <URL> [--subodomain=<subdomain>] [--region=<region>] [--proxy=<port>]
```

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
