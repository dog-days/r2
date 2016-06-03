'use strict';
var path = require('path')
var parse = require('co-body');
/**
 * Module dependencies.
 */
module.exports = function* creator(next) {
	var post = yield parse(this, { limit: '9kb' });
	post = JSON.parse(post);
	this.body = {};
	this.status = 200;
};
