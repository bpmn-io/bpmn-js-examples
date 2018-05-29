import inherits from 'inherits';

import Viewer from 'bpmn-js/lib/Viewer';

import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';

import SketchyRendererModule from 'bpmn-js-sketchy';


/**
 * A viewer that includes mouse navigation and a sketchy renderer.
 *
 * @param {Object} options
 */
export default function CustomViewer(options) {
  Viewer.call(this, options);
}

inherits(CustomViewer, Viewer);

CustomViewer.prototype._customModules = [
  ZoomScrollModule,
  MoveCanvasModule,
  SketchyRendererModule
];

CustomViewer.prototype._modules = [].concat(
  Viewer.prototype._modules,
  CustomViewer.prototype._customModules
);