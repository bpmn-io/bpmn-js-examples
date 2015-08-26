'use strict';

// load dependencies
// require('./Three');
// require('./Detector');
// require('./Stats');
// require('./OrbitControls');
// require('./THREEx.KeyboardState');
// require('./THREEx.FullScreen');
// require('./THREEx.WindowResize');


// we use fs + brfs to inline an example XML document.
// exclude fs in package.json#browser + use the brfs transform
// to generate a clean browserified bundle
var fs = require('fs');

// inlined in result file via brfs
var pizzaDiagram = fs.readFileSync(__dirname + '/../resources/simple.bpmn', 'utf-8');


// require the viewer, make sure you added it to your project
// dependencies via npm install --save-dev bpmn-js
var BpmnViewer = require('bpmn-js');


var viewer = new BpmnViewer({ container: '#canvas' });

viewer.importXML(pizzaDiagram, function(err) {

  if (err) {
    console.log('something went wrong:', err);
  }

  var canvas = viewer.get('canvas'),
      elementRegistry = viewer.get('elementRegistry');

  canvas.zoom('fit-viewport');

  var root = canvas.getRootElement();

  var rootGfx = elementRegistry.getGraphics(root);

  var layers = {};

  var layerNumber = 0;

  // function traverse(element) {
  //   var layer = [];
  //
  //   if (!element.children.length) {
  //     return;
  //   }
  //
  //   layers['layer' + layerNumber] = [];
  //
  //   forEach(element.children, function(elem) {
  //     layers['layer' + layerNumber].push(children);
  //   });
  //
  //   layerNumber += 1
  //
  // }
  //
  // traverse(root);
});
