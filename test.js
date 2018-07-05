'use strict';

const {join, resolve} = require('path');
const {lstat} = require('fs').promises;

const getCacacheInfo = require('cacache').get.info;
const npmCacheEnv = require('.');
const test = require('tape');

test('npmCacheEnv()', t => {
	t.throws(
		() => npmCacheEnv('a', 'b', 'c'),
		/^RangeError.*Expected no arguments, but got 3 arguments\./,
		'should reject any arguments.'
	);

	t.end();
});

test('npmCacheEnv() in a npm script', async t => {
	t.plan(2);

	const result = npmCacheEnv();

	t.ok((await lstat(result)).isDirectory(), 'should get a path to the directory.');

	t.ok(Number.isSafeInteger((await getCacacheInfo(
		join(result, '_cacache'),
		`make-fetch-happen:request-cache:https://registry.npmjs.org/eslint/-/eslint-${
			require('eslint/package.json').version
		}.tgz`
	)).size), 'should get a path where packages are cached.');
});

test('npmCachePath() in a non-npm environment', t => {
	delete process.env.npm_lifecycle_event;
	delete process.env.npm_config_cache;

	t.equal(
		npmCacheEnv(),
		null,
		'should return null if it cannot resolve the path.'
	);

	t.end();
});

test('npmCacheEnv() with additional CLI arguments', t => {
	delete process.env.npm_lifecycle_event;
	/* eslint-disable camelcase */
	process.env.npm_config_cache = 'foo';
	process.env.npm_config_cachE = 'bar';
	/* eslint-enable camelcase */

	t.equal(
		npmCacheEnv(),
		resolve('bar'),
		'should find npm_config_cache case-insensitive.'
	);

	t.end();
});
