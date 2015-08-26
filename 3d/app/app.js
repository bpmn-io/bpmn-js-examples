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

var _ = require('lodash');

// inlined in result file via brfs
var pizzaDiagram = fs.readFileSync(__dirname + '/../resources/pizza-collaboration.bpmn', 'utf-8');


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

  function notLabel(element) {
    return !(element.type === 'label' && !element.businessObject.name);
  }

  function traverse(children) {
    var tempLayers = [];

    if (children.length === 0) {
      return;
    }

    layers['layer' + layerNumber] = [];

    _.forEach(children, function (child) {

      if (notLabel(child)) {
        layers['layer' + layerNumber].push(child);
      }

      _.forEach(child.children || [], function(elem) {
        if (notLabel(elem)) {
          tempLayers.push(elem);
        }
      })
    });

    if (tempLayers.length === 0) {
      return;
    }
    layerNumber += 1;

    traverse(tempLayers);
  }

  layers['layer' + layerNumber] = [ root ];

  layerNumber += 1;

  traverse(root.children);

  console.log(layers);
});
