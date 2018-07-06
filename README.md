# npm-cache-env

[![npm version](https://img.shields.io/npm/v/npm-cache-env.svg)](https://www.npmjs.com/package/npm-cache-env)
[![Build Status](https://travis-ci.org/shinnn/npm-cache-env.svg?branch=master)](https://travis-ci.org/shinnn/npm-cache-env)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/npm-cache-env.svg)](https://coveralls.io/github/shinnn/npm-cache-env?branch=master)

Get the path of [npm cache folder](https://docs.npmjs.com/cli/cache) from [environment variables](https://docs.npmjs.com/misc/config#environment-variables)

```javascript
// NPM_CONFIG_CACHE=/foo/bar node ./example.js
const npmCacheEnv = require('npm-cache-env');

npmCacheEnv(); //=> '/foo/bar'
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install npm-cache-env
```

## API

```javascript
const npmCacheEnv = require('npm-cache-env');
```

### npmCacheEnv()

Return: `String` or `null`

It finds an environment variable corresponding to the [`cache` config](https://docs.npmjs.com/misc/config#cache) of [`npm` CLI](https://github.com/npm/npm):

<https://docs.npmjs.com/misc/config#environment-variables>

> Any environment variables that start with `npm_config_` will be interpreted as a configuration parameter. For example, putting `npm_config_foo=bar` in your environment will set the `foo` configuration parameter to `bar`.

If the `cache` config parameter doesn't exist in the environment variables, it returns `null`.

```javascript
const npmCacheEnv = require('npm-cache-env');

// Npm_Config_Cache=/User/shinnn node ./example.js
npmCacheEnv(); //=> '/User/shinnn'

// node ./example.js
npmCacheEnv(); //=> null
```

The resultant path always becomes absolute.

```javascript
const npmCacheEnv = require('npm-cache-env');

// npm_config_cache=123 node ./example.js
npmCacheEnv(); //=> '/path/to/current/working/directory/123'
```

## License

[ISC License](./LICENSE) © 2018 Shinnosuke Watanabe
