'use strict';

var inherits = require('inherits');

var Viewer = require('bpmn-js/lib/Viewer');


/**
 * A viewer that includes mouse navigation and other goodies.
 *
 * @param {Object} options
 */
function CustomViewer(options) {
  Viewer.call(this, options);
}

inherits(CustomViewer, Viewer);

module.exports = CustomViewer;

CustomViewer.prototype._customModules = [
  require('diagram-js/lib/navigation/zoomscroll'),
  require('diagram-js/lib/navigation/movecanvas'),
  require('./features/logging')
];

CustomViewer.prototype._modules = [].concat(
  Viewer.prototype._modules,
  CustomViewer.prototype._customModules
);