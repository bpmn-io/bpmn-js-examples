'use strict';
/*global THREE: false, transformSVGPathExposed: false*/
function createMesh(pathInfo, scene) {
  var geom = new THREE.ShapeGeometry(transformSVGPathExposed(pathInfo));
  geom.applyMatrix(new THREE.Matrix4().makeTranslation(-390, -74, 0));


  // assign two materials
  var meshMaterial = new THREE.MeshPhongMaterial({color: 0x333333, shininess: 100, metal: true});
  var mesh = new THREE.Mesh(geom, meshMaterial);
  mesh.scale.x = 0.1;
  mesh.scale.y = 0.1;

  mesh.rotation.z = Math.PI;
  mesh.rotation.x = -1.1;
  if (scene) {
    scene.add(mesh);
  }
  return mesh;
}

module.exports = {
  create: createMesh
};
