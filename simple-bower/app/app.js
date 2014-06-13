'use strict';

// we use $.ajax to load the diagram.
// make sure you run the application via web-server (ie. connect (node) or asdf (ruby))

// require the viewer, make sure you added the bpmn-js bower distribution
// along with all its dependencies to the web site
var BpmnViewer = require('bpmn-js');


var viewer = new BpmnViewer({ container: '#canvas' });

$.get('../resources/pizza-collaboration.bpmn', function(pizzaDiagram) {

  viewer.importXML(pizzaDiagram, function(err) {

    if (!err) {
      console.log('success!');
      viewer.get('canvas').zoom('fit-viewport');
    } else {
      console.log('something went wrong:', err);
    }
  });
});
