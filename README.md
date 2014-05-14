# Dusk

## Overview

Dusk is a dashboard app based on [cubism.js](https://github.com/square/cubism). The primary case for Dusk is finding hotspots across a range of values in the same metric domain, e.g. viewing disk latency across an array of disks or fleet of servers.

This project should still be considered beta software. There are known performance and usability issues to address before anyone should rely on this in production.

## Usage

Dusk is designed to be simple and purpose-driven. Any string passed to the `/metrics/` endpoint (including wildcards) will be used as the search context. All metrics found by the Graphite server will be returned and rendered live.

For example, loading `/metrics/collectd.*.load.load.shortterm` will render the `shortterm` metric for all servers in your Graphite instance. Adding the `index` param to your URL defines which (zero-indexed) node should be used as the metric alias. (You can also specify multiple nodes with comma like `?index=1,3,5`.)

![usage](https://github.com/obfuscurity/dusk/raw/master/lib/dusk/public/img/screenshot-usage.png)

## Deployment

The only required environment variable is `GRAPHITE_URL`. This should be set to the base URL of your Graphite composer (e.g. `https://graphite.yourdomain.com`). If your server requires Basic Auth, include the credentials in your `GRAPHITE_URL` (e.g. `https://user:pass@graphite.yourdomain.com`).

### Local

The following instructions assume a working Ruby installation with the `bundler` gem already installed on your system.

```bash
$ git clone https://github.com/obfuscurity/dusk.git
$ cd dusk
$ bundle install
$ export GRAPHITE_URL=...
$ foreman start
$ open http://127.0.0.1:5000
```

### Heroku

```bash
$ heroku create
$ heroku config:add GRAPHITE_URL=...
$ git push heroku master
$ heroku scale web=1
$ heroku open
```

### Chef Cookbook

[Will Maier](https://github.com/whilp) of Simple has kindly contributed a [Dusk cookbook](https://github.com/SimpleFinance/chef-dusk) for Chef users.

## GitHub Authentication

To authenticate against a GitHub organization, set the following environment variables:

```bash
$ export GITHUB_CLIENT_ID=<id>
$ export GITHUB_CLIENT_SECRET=<secret>
$ export GITHUB_AUTH_ORGANIZATION=<org>
```

To register an OAuth application, go here: https://github.com/settings/applications

## License 

Dusk is distributed under the MIT license.

