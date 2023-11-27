import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

// we use stringify to inline an example XML document
import nestedDiagram from '../resources/nested-subprocesses.bpmn';

// make sure you added bpmn-js to your your project
// dependencies via npm install --save bpmn-js
import BpmnViewer from 'bpmn-js';

var viewer = new BpmnViewer({
  container: '#canvas'
});

var canvas = viewer.get('canvas');
var eventBus = viewer.get('eventBus');

var search = new URLSearchParams(window.location.search);
var browserNavigationInProgress;

// update the URL and browser history when switching to another root element
eventBus.on('root.set', function(event) {

  // location is already updated through the browser history API
  if (browserNavigationInProgress) {
    return;
  }

  var rootElement = event.element;

  search.set('rootElement', rootElement.id);
  window.history.pushState({ element: rootElement.id }, null, 'index.html?' + search.toString());
});

// listen to browser navigation and change the root element accordingly
window.addEventListener('popstate', (event) => {
  var rootElement = event.state && event.state.element;

  if (!rootElement) {
    return;
  }

  browserNavigationInProgress = true;
  canvas.setRootElement(canvas.findRoot(rootElement));
  browserNavigationInProgress = false;
});

// import the diagram and set the root element from the search params
browserNavigationInProgress = !!search.get('rootElement');
viewer.importXML(nestedDiagram).then(function() {
  var root = search.get('rootElement');
  if (root) {
    canvas.setRootElement(canvas.findRoot(root));
  }

  browserNavigationInProgress = false;
});
