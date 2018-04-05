export * from 'bpmn-js/test/helper';

import {
  insertCSS
} from 'bpmn-js/test/helper';

insertCSS('diagram-js.css', require('bpmn-js/dist/assets/diagram-js.css'));
insertCSS('bpmn-embedded.css', require('bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'));

insertCSS('diagram-js-testing.css',
  '.test-container .result { height: 500px; }' + '.test-container > div'
);

insertCSS('custom-modeler-testing.css',
  '.icon-custom-triangle {'
    + 'background: url(\'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%233CAA82%22%20width%3D%22270%22%20height%3D%22240%22%3E%3Cpath%20d%3D%22M8%2C40%20l%2015%2C-27%20l%2015%2C27%20z%22%2F%3E%3C%2Fsvg%3E\');'
  + '}'
  + '.icon-custom-circle {'
    + 'background: url(\'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20stroke-width%3D%228%22%20stroke%3D%22%2348a%22%20fill%3D%22none%22%20viewBox%3D%220%200%20120%20120%22%3E%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2240%22%2F%3E%3C%2Fsvg%3E\');'
  + '}'
);
