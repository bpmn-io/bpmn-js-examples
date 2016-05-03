'use strict';

var inherits = require('inherits');

var pick = require('lodash/object/pick'),
    assign = require('lodash/object/assign');

var CommandInterceptor = require('diagram-js/lib/command/CommandInterceptor');

var Collections = require('diagram-js/lib/util/Collections');


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

    if (!isCustom(shape)) {
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

  function updateCustomConnection(e) {

    var context = e.context,
        connection = context.connection,
        source = connection.source,
        target = connection.target,
        businessObject = connection.businessObject;

    var parent = connection.parent;

    var customElements = bpmnjs._customElements;

    // make sure element is added / removed from bpmnjs.customElements
    if (!parent) {
      Collections.remove(customElements, businessObject);
    } else {
      Collections.add(customElements, businessObject);
    }

    // update waypoints
    assign(businessObject, {
      waypoints: copyWaypoints(connection)
    });

    if (source && target) {
      assign(businessObject, {
        source: source.id,
        target: target.id
      });
    }

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

  this.executed([
    'connection.create',
    'connection.reconnectStart',
    'connection.reconnectEnd',
    'connection.updateWaypoints',
    'connection.delete',
    'connection.layout',
    'connection.move'
  ], ifCustomElement(updateCustomConnection));

  this.reverted([
    'connection.create',
    'connection.reconnectStart',
    'connection.reconnectEnd',
    'connection.updateWaypoints',
    'connection.delete',
    'connection.layout',
    'connection.move'
  ], ifCustomElement(updateCustomConnection));

}

inherits(CustomUpdater, CommandInterceptor);

module.exports = CustomUpdater;

CustomUpdater.$inject = [ 'eventBus', 'bpmnjs' ];


/////// helpers ///////////////////////////////////

function copyWaypoints(connection) {
  return connection.waypoints.map(function(p) {
    return { x: p.x, y: p.y };
  });
}

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