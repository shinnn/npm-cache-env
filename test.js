'use strict';

const {join, resolve} = require('path');

const npmCacheEnv = require('.');
const lstat = require('lstat');
const test = require('tape');

test('npmCacheEnv() in a npm script', t => {
  t.plan(2);

  const result = npmCacheEnv();

  lstat(result).then(stat => {
    t.ok(stat.isDirectory(), 'should get a path to the directory.');
  }).catch(t.fail);

  lstat(join(result, 'tape')).then(stat => {
    t.ok(stat.isDirectory(), 'should get a path where packages are cached.');
  }).catch(t.fail);
});

test('npmCacheEnv() with additional CLI arguments', t => {
  /* eslint-disable camelcase */
  delete process.env.npm_lifecycle_event;
  process.env.npm_config_cache = 'foo';
  process.env.npm_config_cachE = 'bar';
  /* eslint-enable camelcase */

  t.strictEqual(
    npmCacheEnv(),
    resolve('bar'),
    'should find npm_config_cache case-insensitive.'
  );

  t.end();
});

test('npmCachePath() in a non-npm environment', t => {
  for (const key of Object.keys(process.env)) {
    if (key.toLowerCase() === 'npm_config_cache') {
      delete process.env[key];
    }
  }

  t.strictEqual(
    npmCacheEnv(),
    null,
    'should return null if it cannot resolve the path.'
  );

  t.end();
});
