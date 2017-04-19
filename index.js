'use strict';

var resolve = require('path').resolve;

var EXACT_KEY = 'npm_config_cache';

function isNpmConfigCacheKey(key) {
  return key.toLowerCase() === EXACT_KEY;
}

module.exports = function npmCacheEnv() {
  var envs = Object.keys(process.env);

  // https://github.com/npm/npm/commit/f3087cc58c903d9a70275be805ebaf0eadbcbe1b
  // > inside npm-scripts npm will set it's own environment variables and
  // > Node will prefer those lowercase versions over any uppercase ones that you might set.
  if (envs.indexOf('npm_lifecycle_event') !== -1) {
    return resolve(process.env[EXACT_KEY]);
  }

  var cacheEnvs = envs.filter(isNpmConfigCacheKey);

  if (cacheEnvs.length === 0) {
    return null;
  }

  // Uses the last key to follow the npm CLI behavior:
  // https://github.com/npm/npm/blob/v4.5.0/lib/config/core.js#L347-L358
  return resolve(process.env[cacheEnvs[cacheEnvs.length - 1]]);
};
