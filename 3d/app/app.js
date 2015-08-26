'use strict';
/*global THREE: false*/
// we use fs + brfs to inline an example XML document.
// exclude fs in package.json#browser + use the brfs transform
// to generate a clean browserified bundle
var fs = require('fs');
var Snap = require('snapsvg');
var _ = require('lodash');

// inlined in result file via brfs
var pizzaDiagram = fs.readFileSync(__dirname + '/../resources/pizza-collaboration.bpmn', 'utf-8');


// require the viewer, make sure you added it to your project
// dependencies via npm install --save-dev bpmn-js
var BpmnViewer = require('bpmn-js');
var threeScene = require('./three-scene')(document.getElementById('three-container'));
// var threeMesh = require('./three-shape2mesh');



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
      var gfx = elementRegistry.getGraphics(child),
          path;

        layers['layer' + layerNumber ].push(child);

      _.forEach(child.children || [], function(elem) {
          tempLayers.push(elem);
      });
    });

    if (tempLayers.length === 0) {
      return;
    }
    layerNumber += 1;

    traverse(tempLayers);
  }

  traverse(root.children);
  console.log(layers);

  var shapeMaterial = new THREE.MeshPhongMaterial({
    color: 0x333366,
    shininess: 60,
    metal: false
  });
  var shapeCatchMaterial = new THREE.MeshPhongMaterial({
    color: 0xFF3333,
    shininess: 60,
    metal: false
  });
  var shapeTaskMaterial = new THREE.MeshPhongMaterial({
    color: 0xFFFFFF,
    shininess: 30,
    metal: false
  });

  var height = 50;
  var scale = 0.2;

  function createElementMesh(el, depth) {
    var geomType;
    var shape;
    var mesh;

    var type = el.type;
    var material = shapeMaterial;

    if (type.indexOf('Catch') > -1) {
      material = shapeCatchMaterial;
    }
    else if (type.indexOf('Task') > -1) {
      material = shapeTaskMaterial;
    }

    if (type.indexOf('Gateway') > -1) {
      shape = new THREE.CubeGeometry(el.width * scale, el.height * scale, height);
      mesh = new THREE.Mesh(shape, material);
      mesh.rotation.z = 45 * 0.0174532925;
      geomType = 'gateway';
    }
    else if (type.indexOf('Event') > -1) {
      // shape = new THREE.SphereGeometry(el.width * scale);
      shape = new THREE.CylinderGeometry(el.width * scale, el.height * scale, height);
      mesh = new THREE.Mesh(shape, material);
      mesh.rotation.x = -90 * 0.0174532925;
      geomType = 'event';
    }
    else if (el.width && el.height) {
      shape = new THREE.CubeGeometry(el.width * scale, el.height * scale, height);
      mesh = new THREE.Mesh(shape, material);
      geomType = 'other';
    }
    else {
      return;
    }

    console.info('el', geomType, type, el.width, el.height, el.x, el.y);
    mesh.position.set(el.x * scale, el.y * scale, depth * height);
    return mesh;
  }

  Object.keys(layers).forEach(function (name, depth) {
    var shapes = layers[name];
    shapes.forEach(function (shape) {
      var mesh = createElementMesh(shape, depth);
      if (mesh) {
        threeScene.scene.add(mesh);
      }
    });
  });

  console.log(layers);
});
