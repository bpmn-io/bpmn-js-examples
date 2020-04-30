import BpmnModeler from 'bpmn-js/lib/Modeler';

import customTranslate from './customTranslate/customTranslate';

import diagramXML from '../resources/newDiagram.bpmn';


// Our custom translation module
// We need to use the array syntax that is used by bpmn-js internally
// 'value' tells bmpn-js to use the function instead of trying to instanciate it
var customTranslateModule = {
  translate: [ 'value', customTranslate ]
};

// Spin up an instance of the modeler that uses our custom translation module
var modeler = new BpmnModeler({
  container: '#canvas',
  additionalModules: [
    customTranslateModule
  ]
});

// Import our diagram
modeler.importXML(diagramXML).then(function() {

  console.log('Success!');
}).catch(function(err) {

  console.error('Error', err);
});
