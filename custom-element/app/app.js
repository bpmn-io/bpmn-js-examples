'use strict';

// we use fs + brfs to inline an example XML document.
// exclude fs in package.json#browser + use the brfs transform
// to generate a clean browserified bundle
var fs = require('fs');

// inlined in result file via brfs
var pizzaDiagram = fs.readFileSync(__dirname + '/../resources/pizza-collaboration.bpmn', 'utf8');

var businessInfo = fs.readFileSync(__dirname + '/businessInfo.json', { encoding: 'utf-8' });

// require the viewer, make sure you added it to your project
// dependencies via npm install --save-dev bpmn-js
var CustomModeler = require('./custom-bpmn-js/CustomModeler');


var modeler = new CustomModeler({ container: '#canvas', keyboard: { bindTo: document } });

modeler.importXML(pizzaDiagram, function(err) {

  if (err) {
    console.error('something went wrong:', err);
  }

  modeler.get('canvas').zoom('fit-viewport');

  modeler.get('customModel').setBusinessModel(JSON.parse(businessInfo));
});

window.modeler = modeler;
