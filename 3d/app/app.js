'use strict';
/*global THREE: false */
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
var threeScene = require('./three-scene')(document.querySelector('#three-container .canvas'));
// var threeMesh = require('./three-shape2mesh');
var camera = threeScene.camera;
var scene = threeScene.scene;

var viewer = new BpmnViewer({ container: '#canvas' });

function makeMaterial(materialType, materialOptions) {
  return new THREE[materialType || 'MeshLambertMaterial'](materialOptions || {
    color: 0xffffff
  });
}






function addFlow(options) {
  options = options || {};

  var el = options.el,
      type = el.type,
      scene = options.scene,
      depth = options.depth || 0,
      height = options.height || 50,
      radius = options.radius || 1,
      wps = el.waypoints,
      scale = options.scale || 1;

  var material = makeMaterial(options.materialType, options.materialOptions || {
    color: type.indexOf('Sequence') > -1 ? 0xff0000 : 0x00ff00,
  });

<<<<<<< 0c6f16714c4ecb2e28437f0c81b35f40afff7eda
  var created = [];
=======
  var returned = [];

>>>>>>> stuff
  wps.forEach(function (wp, i) {
    if (i === 0) {
      return;
    }
    var prevWp = wps[i - 1];

    var start = new THREE.Vector3(
      prevWp.x * scale,
      prevWp.y * scale,
      depth * height * scale
    );
    var end = new THREE.Vector3(
      wp.x * scale,
      wp.y * scale,
      depth * height * scale
    );

    var twoPointsCurve = new THREE.SplineCurve3([start, end]);
    var lineGeometry = new THREE.TubeGeometry(twoPointsCurve, 4, radius, 8, false);
    var lineMesh = new THREE.Mesh(lineGeometry, material);

    scene.add(lineMesh);
    created.push(lineMesh);

    var junctionMesh = new THREE.Mesh(new THREE.SphereGeometry(radius), material);

    junctionMesh.position.set(start);
    scene.add(junctionMesh);
    created.push(junctionMesh);
  });
  return created;
}


function addTask(options) {
  options = options || {};
  var x, y, z;

  var el = options.el,
      scene = options.scene,
      scale = options.scale || 1,
      depth = options.depth || 0,
      height = options.height || 50;

  var material = makeMaterial(options.materialType, options.materialOptions);
  var geometry = new THREE.CubeGeometry(el.width * scale, el.height * scale, height * scale);
  var mesh = new THREE.Mesh(geometry, material);
<<<<<<< 0c6f16714c4ecb2e28437f0c81b35f40afff7eda
  mesh.position.set(el.x * scale, el.y * scale, depth * scale);
  // mesh.position.set(el.x * scale, (maxY * scale) + (el.y * scale * -1), (depth * height) + (height * 0.5))
=======

  x = (el.x + (el.width / 2)) * scale;
  y = (el.y + (el.height / 2)) * scale * -1;
  z = depth * scale;

  mesh.position.set(x, y, z);

>>>>>>> stuff
  scene.add(mesh);
  return [ mesh ];
}

function addEvent(options) {
  options = options || {};
  var x, y, z;

  var el = options.el,
      scene = options.scene,
      scale = options.scale || 1,
      depth = options.depth || 0,
      height = options.height || 50;

  var material = makeMaterial(options.materialType, options.materialOptions);
  var geometry = new THREE.CylinderGeometry(el.width * scale, el.height * scale, height * scale);
  var mesh = new THREE.Mesh(geometry, material);
<<<<<<< 0c6f16714c4ecb2e28437f0c81b35f40afff7eda
  mesh.position.set(el.x * scale, el.y * scale, depth * scale);
  // mesh.position.set(el.x * scale, (maxY * scale) + (el.y * scale * -1), (depth * height) + (height * 0.5))
=======

  x = (el.x + (el.width / 2)) * scale;
  y = (el.y + (el.height / 2)) * scale * -1;
  z = depth * scale;

  mesh.position.set(x, y, z);
>>>>>>> stuff
  mesh.rotation.x = -90 * 0.0174532925;
  scene.add(mesh);
  
  return [ mesh ];
}

function addGateway(options) {
  options = options || {};
  var x, y, z;

  var el = options.el,
      scene = options.scene,
      scale = options.scale || 1,
      depth = options.depth || 0,
      height = options.height || 50;

  var material = makeMaterial(options.materialType, options.materialOptions);

  var geometry = new THREE.Geometry();
  var mesh = new THREE.Mesh(geometry, material);
<<<<<<< 0c6f16714c4ecb2e28437f0c81b35f40afff7eda
  mesh.position.set(el.x * scale, el.y * scale, height * scale);
  // mesh.position.set(el.x * scale, (maxY * scale) + (el.y * scale * -1), (depth * height) + (height * 0.5))
=======

  x = (el.x + (el.width / 2)) * scale;
  y = (el.y + (el.height / 2)) * scale * -1;
  z = depth * scale;

  mesh.position.set(x, y, z);
>>>>>>> stuff
  mesh.rotation.z = 45 * 0.0174532925;
  scene.add(mesh);

  return [ mesh ];
}







viewer.importXML(pizzaDiagram, function(err) {
  if (err) {
    console.log('something went wrong:', err);
  }

  var canvas = viewer.get('canvas');

  canvas.zoom('fit-viewport');


  var root = canvas.getRootElement();


  var layers = {};

  var layerNumber = 0;

  function isLabel(element) {
    return element.type === 'label' && !element.businessObject.name;
  }

  function hasCoords(shape) {
    return shape.x &&
           shape.y &&
           shape.width &&
           shape.height;
  }

  var maxX = 0,
      minX = 0,
      maxY = 0,
      minY = 0;

  function traverse(children) {
    var tempLayers = [];

    if (children.length === 0) {
      return;
    }

    layers['layer' + layerNumber] = [];

    _.forEach(children, function (child) {
      if (isLabel(child)) {
        return;
      }

      layers['layer' + layerNumber ].push(child);

      if (hasCoords(child)) {
        minX = Math.min(child.x, minX);
        maxX = Math.max(child.x + child.width, maxX);
        minY = Math.min(child.y, minY);
        maxY = Math.max(child.y + child.height, maxY);
      }

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


  var height = 50;
  var scale = 0.2;

  function createElementMesh(el, depth) {
    var created = [];
    var type = el.type;

    var options = {
      el: el,
      scene: scene,
      scale: scale,
      depth: depth,
      height: height * depth
    };

    function has(what) {
      return type.indexOf(what) > -1;
    }

    if (has('Gateway')) {
      created = created.concat(addGateway(options));
    }
    else if (has('Flow')) {
      created = created.concat(addFlow(options));
    }
    else if (has('Event')) {
      created = created.concat(addEvent(options));
    }
    else if (has('Task')) {
      created = created.concat(addTask(options));
    }

    return created;
  }

  var names = Object.keys(layers).reverse();
  var created = [];
  _.forEach(names, function (name, d) {
    var shapes = layers[name];
    _.forEach(shapes, function (shape) {
      var group = new THREE.Object3D();
      createElementMesh(shape, d).forEach(function (mesh) {
        group.add(mesh);
      });
      var flip = 180 * 0.0174532925;
      group.rotation.set(0, flip, flip);
      group.translateX(maxX * scale);
      group.translateY(maxY * (-1 * scale));
      scene.add(group);
      // created = created.concat(createElementMesh(shape, d));
      created.push(group);

    });
  });


  names.forEach(function (layer, d) {
    var shape = new THREE.PlaneGeometry(maxX * scale, maxY * scale);
    var mesh = new THREE.Mesh(shape, new THREE.MeshLambertMaterial({
      color: 0x999999,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2
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

  console.log(scene);
});
