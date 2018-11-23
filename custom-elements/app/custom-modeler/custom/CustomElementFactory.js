import {
  assign
} from 'min-dash';

import inherits from 'inherits';

import BpmnElementFactory from 'bpmn-js/lib/features/modeling/ElementFactory';
import {
  DEFAULT_LABEL_SIZE
} from 'bpmn-js/lib/util/LabelUtil';


/**
 * A custom factory that knows how to create BPMN _and_ custom elements.
 */
export default function CustomElementFactory(bpmnFactory, moddle) {
  BpmnElementFactory.call(this, bpmnFactory, moddle);

  var self = this;

  /**
   * Create a diagram-js element with the given type (any of shape, connection, label).
   *
   * @param  {String} elementType
   * @param  {Object} attrs
   *
   * @return {djs.model.Base}
   */
  this.create = function(elementType, attrs) {
    var type = attrs.type;

    if (elementType === 'label') {
      return self.baseCreate(elementType, assign({ type: 'label' }, DEFAULT_LABEL_SIZE, attrs));
    }

    // add type to businessObject if custom
    if (/^custom:/.test(type)) {
      if (!attrs.businessObject) {
        attrs.businessObject = {
          type: type
        };

        if (attrs.id) {
          assign(attrs.businessObject, {
            id: attrs.id
          });
        }
      }

      // add width and height if shape
      if (!/:connection$/.test(type)) {
        assign(attrs, self._getCustomElementSize(type));
      }


      // we mimic the ModdleElement API to allow interoperability with
      // other components, i.e. the Modeler and Properties Panel

      if (!('$model' in attrs.businessObject)) {
        Object.defineProperty(attrs.businessObject, '$model', {
          value: moddle
        });
      }

      if (!('$instanceOf' in attrs.businessObject)) {
        // ensures we can use ModelUtil#is for type checks
        Object.defineProperty(attrs.businessObject, '$instanceOf', {
          value: function(type) {
            return this.type === type;
          }
        });
      }

      if (!('get' in attrs.businessObject)) {
        Object.defineProperty(attrs.businessObject, 'get', {
          value: function(key) {
            return this[key];
          }
        });
      }

      if (!('set' in attrs.businessObject)) {
        Object.defineProperty(attrs.businessObject, 'set', {
          value: function(key, value) {
            return this[key] = value;
          }
        });
      }

      // END minic ModdleElement API

      return self.baseCreate(elementType, attrs);
    }

    return self.createBpmnElement(elementType, attrs);
  };
}

inherits(CustomElementFactory, BpmnElementFactory);

CustomElementFactory.$inject = [
  'bpmnFactory',
  'moddle'
];


/**
 * Returns the default size of custom shapes.
 *
 * The following example shows an interface on how
 * to setup the custom shapes's dimensions.
 *
 * @example
 *
 * var shapes = {
 *   triangle: { width: 40, height: 40 },
 *   rectangle: { width: 100, height: 20 }
 * };
 *
 * return shapes[type];
 *
 *
 * @param {String} type
 *
 * @return {Dimensions} a {width, height} object representing the size of the element
 */
CustomElementFactory.prototype._getCustomElementSize = function(type) {
  var shapes = {
    __default: { width: 100, height: 80 },
    'custom:triangle': { width: 40, height: 40 },
    'custom:circle': { width: 140, height: 140 }
  };

  return shapes[type] || shapes.__default;
};
