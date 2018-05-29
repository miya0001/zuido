# zuido

`zuido` is a command line tool that allows you to connect your local development environment from public URLs with ngrok and simple reverse proxy.

The proxy server in this command will change the URLs in your HTML to the public URL that is supplied by ngrok.

https://ngrok.com/

## Usage

Forwards public URL (e.g, `https://xxxxxxxx.ngrok.io`) to `http://localhsot:8080` and open your browser.

```
$ zuido http://localhsot:8080
```

If you are payed user of the ngrok, you can choose subdomain like following.

```
$ zuido --subdomain=zuido http://localhsot:8080
```

## How to install

```
$ npm install -g zuido
```

## Configuration

See documentation for ngrok.

https://ngrok.com/docs#config