// we use stringify to inline an example XML document
import pizzaDiagram from '../resources/pizza-collaboration.bpmn';


// make sure you added bpmn-js to your your project
// dependencies via npm install --save bpmn-js
import BpmnViewer from 'bpmn-js';

var viewer = new BpmnViewer({
  container: '#canvas'
});

viewer.importXML(pizzaDiagram, function(err) {

  if (!err) {
    console.log('success!');
    viewer.get('canvas').zoom('fit-viewport');
  } else {
    console.log('something went wrong:', err);
  }
});