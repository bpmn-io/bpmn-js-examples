'use strict';

var inherits = require('inherits');

var pick = require('lodash/object/pick'),
    assign = require('lodash/object/assign');

var CommandInterceptor = require('diagram-js/lib/command/CommandInterceptor');

var Collections = require('diagram-js/lib/util/Collections');


function isCustom(element) {
  return element && /custom\:/.test(element.type);
}

function ifCustomElement(fn) {
  return function(event) {
    var context = event.context,
        element = context.shape || context.connection;

    if (isCustom(element)) {
      fn(event);
    }
  };
}

/**
 * A handler responsible for updating the custom element's businessObject
 * once changes on the diagram happen.
 */
function CustomUpdater(eventBus, bpmnjs) {

  CommandInterceptor.call(this, eventBus);

  function updateCustomElement(e) {
    var context = e.context,
        shape = context.shape,
        businessObject = shape.businessObject;

    if (!isCustom(shape, 'custom:triangle')) {
      return;
    }

    var parent = shape.parent;

    var customElements = bpmnjs._customElements;

    // make sure element is added / removed from bpmnjs.customElements
    if (!parent) {
      Collections.remove(customElements, businessObject);
    } else {
      Collections.add(customElements, businessObject);
    }

    // save custom element position
    assign(businessObject, pick(shape, [ 'x', 'y' ]));
  }

  this.executed([
    'shape.create',
    'shape.move',
    'shape.delete'
  ], ifCustomElement(updateCustomElement));

  this.reverted([
    'shape.create',
    'shape.move',
    'shape.delete'
  ], ifCustomElement(updateCustomElement));

}

inherits(CustomUpdater, CommandInterceptor);

module.exports = CustomUpdater;

CustomUpdater.$inject = [ 'eventBus', 'bpmnjs' ];
