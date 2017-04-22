'use strict';

const resolve = require('path').resolve;

const EXACT_KEY = 'npm_config_cache';

module.exports = function npmCacheEnv() {
  const keys = Object.keys(process.env);

  // https://github.com/npm/npm/commit/f3087cc58c903d9a70275be805ebaf0eadbcbe1b
  // > inside npm-scripts npm will set it's own environment variables and
  // > Node will prefer those lowercase versions over any uppercase ones that you might set.
  if (keys.indexOf('npm_lifecycle_event') !== -1) {
    return resolve(process.env[EXACT_KEY]);
  }

  // Use the last key by reverse iteration to follow the npm CLI behavior:
  // https://github.com/npm/npm/blob/v4.5.0/lib/config/core.js#L347-L358
  for (const key of keys.reverse()) {
    if (key.toLowerCase() === EXACT_KEY) {
      return resolve(process.env[key]);
    }
  }

  return null;
};
