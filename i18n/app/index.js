'use strict';

var fs = require('fs');
var BpmnModeler = require('bpmn-js/lib/Modeler');

// Our custom translation module
// We need to use the array syntax that is used by bpmn-js internally
// 'value' tells bmpn-js to use the function instead of trying to instanciate it
var customTranslate = {
  translate: [ 'value', require('./customTranslate/customTranslate') ]
};

// Require our diagram
var newDiagramXML = fs.readFileSync(__dirname + '/../resources/newDiagram.bpmn', 'utf-8');

var container = document.getElementById('canvas');

// Spin up an instance of the modeler that uses our custom translation module
var modeler = new BpmnModeler({
  container: container,
  additionalModules: [
    customTranslate
  ]
});

// Import our diagram
modeler.importXML(newDiagramXML, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Success!');
  }
});
