'use strict';

// we use fs + brfs to inline an example XML document.
// exclude fs in package.json#browser + use the brfs transform
// to generate a clean browserified bundle
var fs = require('fs');

// inlined in result file via brfs
var qrDiagram = fs.readFileSync(__dirname + '/../resources/qr-code.bpmn', 'utf-8');

var viewer;
var $ = require('jquery');

// Project init
(function() {
  var BpmnViewer = require('bpmn-js');
  var overlayModule = require('../../../diagram-js/lib/features/overlays');

  //Important to explicitly load the Overlay service, as it's not a standard component of the viewer/modeler
  var bpmnModules = BpmnViewer.prototype._modules.concat([ overlayModule ]);
  viewer = new BpmnViewer({ container: '#canvas', modules: bpmnModules});
})();


viewer.importXML(qrDiagram, function(err) {

  var elementRegistry;
  if (!err) {
    viewer.get('canvas').zoom('fit-viewport');
    elementRegistry = viewer.get('elementRegistry');
  } else {
    console.log('something went wrong:', err);
  }

  var shape = elementRegistry.getById('SCAN_OK');
  attachAnnotation(shape, 'Mixed up the labels?');
});

function attachAnnotation(shape, label) {
  var overlays = viewer.get('overlays');

  var element = $('<div>', {
    text: label
  }).css({
    'background-color': 'rgba(66, 180, 21, 0.7)',
    'color': 'white',
    'border-radius': '5px',
    'font-family': 'Arial',
    'padding': '3px',
    'font-size': '11px',
    'display': 'inline-block',
    'min-height': '16px',
    'min-width': '50px',
    'text-align': 'center',
    'position': 'absolute',
    'left': shape.width + 'px',
    'top': shape.height + 'px'
    });
  element.text = label;

  overlays.addOverlay(shape, {
    html: element
  });
}