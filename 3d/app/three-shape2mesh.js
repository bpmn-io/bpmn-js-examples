'use strict';
/*global THREE: false, transformSVGPathExposed: false*/
function createMesh(pathInfo, scene) {
  var geom;
  try {
    geom = new THREE.ShapeGeometry(transformSVGPathExposed(pathInfo));
  }
  catch (err) {
    console.info('your path sucks', pathInfo, err);
    return;
  }
  geom.applyMatrix(new THREE.Matrix4().makeTranslation(-390, -74, 0));


  // assign two materials
  var meshMaterial = new THREE.MeshPhongMaterial({
    color: 0x333333,
    shininess: 100,
    metal: true
  });
  var mesh = new THREE.Mesh(geom, meshMaterial);
  mesh.scale.x = 0.5;
  mesh.scale.y = 0.5;

  // mesh.rotation.z = Math.PI;
  // mesh.rotation.x = -1.1;
  if (scene) {
    scene.add(mesh);
  }
  return mesh;
}

module.exports = {
  create: createMesh
};
