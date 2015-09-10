'use strict';

var Modeler = require('bpmn-js/lib/Modeler');

var assign = require('lodash/object/assign');

var inherits = require('inherits');

function CustomModeler(options) {
  Modeler.call(this, options);
}

inherits(CustomModeler, Modeler);

CustomModeler.prototype._modules = [].concat(
  CustomModeler.prototype._modules,
  [
    require('./custom')
  ]
);

/**
 * Add a single custom element to the underlying diagram
 *
 * @param {Object} customElement
 */
CustomModeler.prototype.addCustomElement = function(customElement) {

  var canvas = this.get('canvas'),
      elementFactory = this.get('elementFactory');

  var customShapeAttrs = assign({ businessObject: customElement }, customElement);

  var customShape = elementFactory.create('shape', customShapeAttrs);

  canvas.addShape(customShape);
};

/**
 * Add a number of custom elements to the underlying diagram.
 *
 * @param {Array<Object>} customElements
 */
CustomModeler.prototype.setCustomElements = function(customElements) {

  if (!this.diagram) {
    throw new Error('load a diagram first');
  }

  this._customElements = customElements;

  customElements.forEach(this.addCustomElement.bind(this));
};

/**
 * Get custom elements with their current status.
 *
 * @return {Array<Object>} custom elements on the diagram
 */
CustomModeler.prototype.getCustomElements = function() {
  return this._customElements;
};

module.exports = CustomModeler;
