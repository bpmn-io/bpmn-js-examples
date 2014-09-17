// get bpmn-js
var BpmnViewer = require('bpmn-js/lib/Viewer');

// load additional modules
var additionalModules = [
  require('diagram-js/lib/navigation/movecanvas'),
  require('diagram-js/lib/navigation/zoomscroll')
];

// add additional (default!) modules to bpmn-js
BpmnViewer.prototype._modules = BpmnViewer.prototype._modules.concat(additionalModules);

// export
module.exports = BpmnViewer;