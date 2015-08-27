'use strict';
/*global THREE: false, dat: false*/
// we use fs + brfs to inline an example XML document.
// exclude fs in package.json#browser + use the brfs transform
// to generate a clean browserified bundle
var fs = require('fs');
// var Snap = require('snapsvg');
var _ = require('lodash');

// inlined in result file via brfs
var pizzaDiagram = fs.readFileSync(__dirname + '/../resources/pizza-collaboration.bpmn', 'utf-8');


// require the viewer, make sure you added it to your project
// dependencies via npm install --save-dev bpmn-js
var BpmnViewer = require('bpmn-js');
var threeScene = require('./three-scene')(document.getElementById('three-container'));
// var threeMesh = require('./three-shape2mesh');
var camera = threeScene.camera;
var scene = threeScene.scene;

var viewer = new BpmnViewer({ container: '#canvas' });

viewer.importXML(pizzaDiagram, function(err) {
  if (err) {
    console.log('something went wrong:', err);
  }

  var canvas = viewer.get('canvas'),
      elementRegistry = viewer.get('elementRegistry');

  canvas.zoom('fit-viewport');

  viewer.container.parentNode.style.display = 'none';

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
    else if (type.indexOf('Task') > -1) {
      shape = new THREE.CubeGeometry(el.width * scale, el.height * scale, height);
      mesh = new THREE.Mesh(shape, material);
      geomType = 'task';
    }
    // else if (type.indexOf('Lane') > -1) {
    // else if (el.width && el.height) {
    //   shape = new THREE.CubeGeometry(el.width * scale, el.height * scale, height * scale);
    //   mesh = new THREE.Mesh(shape, material);
    //   geomType = 'other';
    // }
    else {
      return;
    }

    console.info('el', geomType, type, el.width, el.height, el.x, el.y);
    mesh.position.set(el.x * scale, el.y * scale, (depth * height) + (height * 0.5));
    return mesh;
  }



  var names = Object.keys(layers).reverse();
  var minX = 0;
  var maxX = 0;
  var minY = 0;
  var maxY = 0;

  function hasCoords(shape) {
    console.info('shape', shape);
    return typeof shape.x !== 'undefined' &&
           typeof shape.y !== 'undefined' &&
           typeof shape.width !== 'undefined' &&
           typeof shape.height !== 'undefined';
  }

  names.forEach(function (name, d) {
    var shapes = layers[name];
    shapes.forEach(function (shape) {
      if (hasCoords(shape)) {
        minX = Math.min(shape.x, minX);
        maxX = Math.max(shape.x + shape.width, maxX);

        minY = Math.min(shape.y, minY);
        maxY = Math.max(shape.y + shape.height, maxY);
      }

      var mesh = createElementMesh(shape, d);
      if (mesh) {
        scene.add(mesh);
      }
    });
  });

  names.forEach(function (layer, d) {
    var shape = new THREE.PlaneGeometry(maxX * scale, maxY * scale);
    var mesh = new THREE.Mesh(shape, new THREE.MeshLambertMaterial({
      color: 0x999999,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75
    }));

    var x = (minX + (maxX / 2)) * scale;
    var y = (minY + (maxY / 2)) * scale;
    mesh.position.set(x, y, d * height);
    scene.add(mesh);

    camera.position.set(x, y, (x + y) / 2);
    var lookAt = mesh.position.clone();
    lookAt.setZ(0);
    camera.lookAt(lookAt);
  });

  console.log(layers);
});
