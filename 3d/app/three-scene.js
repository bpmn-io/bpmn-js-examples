
/*global THREE: false, THREEx: false, Detector: false, Stats: false, dat: false*/
'use strict';

// MAIN
// standard global variables
var scene, camera, renderer, controls, stats, lookAt;//, lookAtMesh;
// var keyboard = new THREEx.KeyboardState();
var pageParams = {show: 0};

var gui = new dat.GUI({
  autoPlace: false
});

document.querySelector('#three-container').appendChild(gui.domElement);
gui.domElement.classList.add('properties');

// gui.add(pageParams, 'show', {WebGL: 0, SVG: 1}).onChange(function (value) {
//   document.body.classList[!parseInt(value, 10) ? 'remove' : 'add']('canvas');
// });





function animate() {
  requestAnimationFrame( animate );
  render();
  update();
}




function update() {
  // var position = camera.position;
  // var speed = 5;


  // if (keyboard.pressed('w') || keyboard.pressed('i')) {
  //   if (!keyboard.pressed('space')) {
  //     position.setZ(position.z - speed);
  //   }

  //   if (keyboard.pressed('shift')) {
  //     lookAt.setZ(lookAt.z - speed);
  //   }
  // }
  // else if (keyboard.pressed('s') || keyboard.pressed('k')) {
  //   if (!keyboard.pressed('space')) {
  //     position.setZ(position.z + speed);
  //   }

  //   if (keyboard.pressed('shift')) {
  //     lookAt.setZ(lookAt.z + speed);
  //   }
  // }

  // if (keyboard.pressed('a') || keyboard.pressed('j')) {
  //   if (!keyboard.pressed('space')) {
  //     position.setX(position.x - speed);
  //   }

  //   if (keyboard.pressed('shift')) {
  //     lookAt.setX(lookAt.x - speed);
  //   }
  // }
  // else if (keyboard.pressed('d') || keyboard.pressed('l')) {
  //   if (!keyboard.pressed('space')) {
  //     position.setX(position.x + speed);
  //   }

  //   if (keyboard.pressed('shift')) {
  //     lookAt.setX(lookAt.x + speed);
  //   }
  // }
  // camera.lookAt(lookAt);
  // lookAtMesh.position.set(lookAt);


  // var folderNames = Object.keys(gui.__folders);
  // gui.__controllers.forEach(function (ctrl) {
  //   ctrl.updateDisplay();
  // });

  // folderNames.forEach(function (name) {
  //   gui.__folders[name].__controllers.forEach(function (ctrl) {
  //     ctrl.updateDisplay();
  //   });
  // });

  controls.update();
  stats.update();
}

function render() {
  renderer.render( scene, camera );
}

module.exports = function init(container) {
  /*jshint maxstatements: false*/
  // SCENE
  scene = new THREE.Scene();
  lookAt = new THREE.Vector3(118, 94, 0);

  // CAMERA
  var SCREEN_WIDTH = container.clientWidth, SCREEN_HEIGHT = container.clientHeight;
  var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;

  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(123, 138, 349);
  camera.lookAt(lookAt);

  scene.add(camera);

  scene.add(new THREE.CameraHelper(camera));
  // var lookAtGeometry = new THREE.SphereGeometry(20);

  // var lookAtMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});

  // lookAtMesh = new THREE.Mesh(lookAtGeometry, lookAtMaterial);
  // lookAtMesh.position.set(lookAt);
  // scene.add(lookAtMesh);

  // var cameraCtrls = gui.addFolder('camera');
  // cameraCtrls.add(camera.position, 'x');
  // cameraCtrls.add(camera.position, 'y');
  // cameraCtrls.add(camera.position, 'z');
  // // cameraCtrls.open();

  // var cameraDirectionCtrls = gui.addFolder('direction');
  // cameraDirectionCtrls.add(lookAt, 'x').onChange(function(val) {
  //   lookAt.setX(val);
  //   camera.lookAt(lookAt);
  // });
  // cameraDirectionCtrls.add(lookAt, 'y').onChange(function(val) {
  //   lookAt.setY(val);
  //   camera.lookAt(lookAt);
  // });
  // cameraDirectionCtrls.add(lookAt, 'z').onChange(function(val) {
  //   lookAt.setZ(val);
  //   camera.lookAt(lookAt);
  // });
  // // cameraDirectionCtrls.open();

  // RENDERER
  if ( Detector.webgl ) {
    renderer = new THREE.WebGLRenderer( { antialias:true } );
  }
  else {
    renderer = new THREE.CanvasRenderer();
  }
  renderer.setClearColor( 0xC1FCC0, 1);
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  container.appendChild( renderer.domElement );
  // EVENTS
  THREEx.WindowResize(renderer, camera);
  THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
  // CONTROLS
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  // STATS
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  container.appendChild( stats.domElement );


  // LIGHT
  var light = new THREE.PointLight(0xffffff, 1);
  light.position.set(100,250,100);
  scene.add(light);

  light = new THREE.PointLight(0xffffff, 1);
  light.position.set(0,1000,1000);
  scene.add(light);

  light = new THREE.PointLight(0xffffff, 1);
  light.position.set(1000, 0, 0);
  scene.add(light);


  // // FLOOR
  // var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
  // floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  // floorTexture.repeat.set( 10, 10 );
  // var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
  // var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
  // var floor = new THREE.Mesh(floorGeometry, floorMaterial);
  // floor.position.y = -0.5;
  // floor.rotation.x = Math.PI / 2;
  // scene.add(floor);


  var axes = new THREE.AxisHelper(50);
  scene.add(axes);

  var gridXZ = new THREE.GridHelper(100, 10);
  gridXZ.setColors( new THREE.Color(0x006600), new THREE.Color(0x006600) );
  gridXZ.position.set( 100,0,100 );
  scene.add(gridXZ);

  var gridXY = new THREE.GridHelper(100, 10);
  gridXY.position.set( 100,100,0 );
  gridXY.rotation.x = Math.PI/2;
  gridXY.setColors( new THREE.Color(0x000066), new THREE.Color(0x000066) );
  scene.add(gridXY);

  var gridYZ = new THREE.GridHelper(100, 10);
  gridYZ.position.set( 0,100,100 );
  gridYZ.rotation.z = Math.PI/2;
  gridYZ.setColors( new THREE.Color(0x660000), new THREE.Color(0x660000) );
  scene.add(gridYZ);

  animate();

  return {
    scene: scene,
    camera: camera,
    renderer: renderer,
    controls: controls,
    stats: stats,
    gui: gui
  };
};
