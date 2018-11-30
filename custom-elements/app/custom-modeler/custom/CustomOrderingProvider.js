import inherits from 'inherits';

import OrderingProvider from 'diagram-js/lib/features/ordering/OrderingProvider';


/**
 * a simple ordering provider that ensures that custom
 * connections are always rendered on top.
 */
export default function CustomOrderingProvider(eventBus, canvas) {

  OrderingProvider.call(this, eventBus);

  this.getOrdering = function(element, newParent) {

    if (element.type === 'custom:connection') {
      var parent = canvas.getRootElement();
      var index = parent.children.length - 1;

      return {
        parent: parent,
        index: index
      };
    }
  };
}

CustomOrderingProvider.$inject = [ 'eventBus', 'canvas' ];

inherits(CustomOrderingProvider, OrderingProvider);