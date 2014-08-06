'use strict';

// we use fs + brfs to inline an example XML document.
// exclude fs in package.json#browser + use the brfs transform
// to generate a clean browserified bundle
var fs = require('fs');

// inlined in result file via brfs
var qrDiagram = fs.readFileSync(__dirname + '/../resources/qr-code.bpmn', 'utf-8');



var BpmnViewer = require('bpmn-js'),
    $ = require('jquery');

var bpmnViewer = new BpmnViewer({
  container: '#canvas',
  width: '100%',
  height: '100%'
});


// import qr diagram

bpmnViewer.importXML(qrDiagram, function(err) {

  if (err) {
    return console.error('could not import BPMN 2.0 diagram', err);
  }

  var canvas = bpmnViewer.get('canvas'),
      overlays = bpmnViewer.get('overlays');


  // zoom to fit full viewport
  canvas.zoom('fit-viewport');

  // attach an overlay to a node
  overlays.add('SCAN_OK', 'note', {
    position: {
      bottom: 0,
      right: 0
    },
    html: '<div class="diagram-note">Mixed up the labels?</div>'
  });

});