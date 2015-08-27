
/*global THREE: false, THREEx: false, Detector: false, Stats: false, dat: false*/
'use strict';

// MAIN
// standard global variables
var scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();


var gui = new dat.GUI();


function animate() {
  requestAnimationFrame( animate );
  render();
  update();
}

function update() {
  if (keyboard.pressed('w')) {
    console.info('pressed forth');
  }
  else if (keyboard.pressed('s')) {
    console.info('pressed back');
  }

  if (keyboard.pressed('a')) {
    console.info('pressed left');
  }
  else if (keyboard.pressed('d')) {
    console.info('pressed left');
  }

  gui.__controllers.forEach(function (ctrl) {
    ctrl.updateDisplay();
  });

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
  // CAMERA
  var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
  var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(250, 250, 400);

  var lookAt = scene.position.clone();
  camera.lookAt(lookAt);

  var cameraCtrls = gui.addFolder('camera');
  cameraCtrls.add(camera.position, 'x')/*.listen()*/;
  cameraCtrls.add(camera.position, 'y')/*.listen()*/;
  cameraCtrls.add(camera.position, 'z')/*.listen()*/;
  cameraCtrls.open();

  var cameraDirectionCtrls = gui.addFolder('direction');
  cameraDirectionCtrls.add(lookAt, 'x').onChange(function(val) {
    lookAt.setX(val);
    camera.lookAt(lookAt);
  });
  cameraDirectionCtrls.add(lookAt, 'y').onChange(function(val) {
    lookAt.setY(val);
    camera.lookAt(lookAt);
  });
  cameraDirectionCtrls.add(lookAt, 'z').onChange(function(val) {
    lookAt.setZ(val);
    camera.lookAt(lookAt);
  });
  cameraDirectionCtrls.open();






  // RENDERER
  if ( Detector.webgl ) {
    renderer = new THREE.WebGLRenderer( {antialias:true} );
  }
  else {
    renderer = new THREE.CanvasRenderer();
  }
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
  var light = new THREE.PointLight(0xffffff);
  light.position.set(100,250,100);
  scene.add(light);

  light = new THREE.PointLight(0xffffff);
  light.position.set(0,1000,1000);
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
  axes.position = {x:-40, y:-40, z:-40};//mesh.position;
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
    stats: stats
  };
};
