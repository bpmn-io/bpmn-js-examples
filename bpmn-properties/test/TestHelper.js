export * from 'bpmn-js/test/helper';

import {
  insertCSS
} from 'bpmn-js/test/helper';

insertCSS('diagram-js.css', require('bpmn-js/dist/assets/diagram-js.css'));
insertCSS('bpmn-embedded.css', require('bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'));

insertCSS('diagram-js-testing.css',
  '.test-container .result { height: 500px; }' + '.test-container > div'
);