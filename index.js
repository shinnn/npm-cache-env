'use strict';

const {resolve} = require('path');

const EXACT_KEY = 'npm_config_cache';

module.exports = function npmCacheEnv(...args) {
	const len = args.length;

	if (len !== 0) {
		throw new RangeError(`Expected no arguments, but got ${len} arguments.`);
	}

	// https://github.com/npm/npm/commit/f3087cc58c903d9a70275be805ebaf0eadbcbe1b
	// > inside npm-scripts npm will set it's own environment variables and
	// > Node will prefer those lowercase versions over any uppercase ones that you might set.
	if (Reflect.getOwnPropertyDescriptor(process.env, 'npm_lifecycle_event') !== undefined) {
		return resolve(process.env[EXACT_KEY]);
	}

	// Use the last key by reverse iteration to follow the npm CLI behavior:
	// https://github.com/npm/npm/blob/v5.0.4/lib/config/core.js#L347-L358
	for (const [key, value] of Object.entries(process.env).reverse()) {
		if (key.toLowerCase() === EXACT_KEY) {
			return resolve(value);
		}
	}

	return null;
};
