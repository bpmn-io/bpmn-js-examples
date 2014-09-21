'use strict';

// we use fs + brfs to inline an example XML document.
// exclude fs in package.json#browser + use the brfs transform
// to generate a clean browserified bundle
var fs = require('fs');

var $ = require('jquery');


// inlined in result file via brfs
var pizzaDiagram = fs.readFileSync(__dirname + '/../resources/pizza-collaboration.bpmn', 'utf-8');



// require the viewer, make sure you added it to your project
// dependencies via npm install --save-dev bpmn-js
var BpmnViewer = require('bpmn-js'),
    EmbeddedComments = require('bpmn-js-embedded-comments'),
    ZoomScroll = require('diagram-js/lib/navigation/zoomscroll'),
    MoveCanvas = require('diagram-js/lib/navigation/movecanvas');


var viewer = new BpmnViewer({
               container: '#canvas',
               additionalModules: [
                 EmbeddedComments,
                 ZoomScroll,
                 MoveCanvas
               ]
             });

viewer.importXML(pizzaDiagram, function(err) {

  if (!err) {
    console.log('success!');
    viewer.get('canvas').zoom('fit-viewport');
  } else {
    console.log('something went wrong:', err);
  }
});


var $download = $('[data-download]');

function serialize() {

  viewer.saveXML(function(err, xml) {

    var encodedData = err ? '' : encodeURIComponent(xml);

    $download.attr({
      'href': encodedData ? 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData : '',
    });

    if (err) {
      console.log('failed to serialize BPMN 2.0 xml', err);
    }
  });
}

viewer.on('comments.updated', serialize);
viewer.on('commandStack.changed', serialize);

viewer.on('canvas.click', function() {
  viewer.get('comments').hideAll();
});