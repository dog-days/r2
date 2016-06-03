'use strict';

/**
 * Module dependencies.
 */

var creator = require('./controllers/creator');
var getSecondParentModule = require('./controllers/getSecondParentModule');
var previewModuleContents = require('./controllers/previewModuleContents');
var saveModuleContents = require('./controllers/saveModuleContents');
var provideModuleData = require('./controllers/provideModuleData');
module.exports = function routes(app) {
    app.post('/creator', creator);
    app.get('/getSecondParentModule', getSecondParentModule);
    app.post('/previewModuleContents', previewModuleContents);
    app.post('/saveModuleContents', saveModuleContents);
    app.get('/provideModuleData', provideModuleData);
};
