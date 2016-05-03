'use strict';

// inlined diagram; load it from somewhere else if you like
var pizzaDiagram = require('../resources/pizza-collaboration.bpmn');

// custom elements JSON; load it from somewhere else if you like
var customElements = require('./custom-elements.json');


// our custom modeler
var CustomModeler = require('./custom-modeler');


var modeler = new CustomModeler({ container: '#canvas', keyboard: { bindTo: document } });

modeler.importXML(pizzaDiagram, function(err) {

  if (err) {
    console.error('something went wrong:', err);
  }

  modeler.get('canvas').zoom('fit-viewport');

  modeler.addCustomElements(customElements);
});


// expose bpmnjs to window for debugging purposes
window.bpmnjs = modeler;
