// get bpmn-js
var BpmnViewer = require('bpmn-js/lib/viewer');

// load additional modules
var additionalModules = [
  require('bpmn-js/lib/features/movecanvas'),
  require('bpmn-js/lib/features/zoomscroll')
];

// add additional (default!) modules to bpmn-js
BpmnViewer.prototype._modules = BpmnViewer.prototype._modules.concat(additionalModules);

// export
module.exports = BpmnViewer;