'use strict';

/**
 * Module dependencies.
 */

var path = require('path');

var config = {
  version: 1.0,
  debug: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 7001
};

module.exports = config;
