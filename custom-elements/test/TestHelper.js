'use strict';

var TestHelper = module.exports = require('bpmn-js/test/helper');

TestHelper.insertCSS('diagram-js.css', require('diagram-js/assets/diagram-js.css'));
TestHelper.insertCSS('bpmn-embedded.css', require('bpmn-js/assets/bpmn-font/css/bpmn-embedded.css'));

TestHelper.insertCSS('diagram-js-testing.css',
  '.test-container .result { height: 500px; }' + '.test-container > div'
);

TestHelper.insertCSS('custom-modeler-testing.css',
  '.icon-custom-triangle {'
    + 'background: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="#3CAA82" width="270" height="240"><path d="M8,40 l 15,-27 l 15,27 z"/></svg>\');'
  + '}'
  + '.icon-custom-circle {'
    + 'background: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" stroke-width="8" stroke="#48a" fill="none" viewBox="0 0 120 120"><circle cx="60" cy="60" r="40"/></svg>\');'
  + '}'
);
