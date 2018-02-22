'use strict';

var inherits = require('inherits');

var ContextPadProvider = require('bpmn-js/lib/features/context-pad/ContextPadProvider');

var isAny = require('bpmn-js/lib/features/modeling/util/ModelingUtil').isAny;

var assign = require('lodash/object/assign'),
    bind = require('lodash/function/bind');

function CustomContextPadProvider(injector, connect, translate) {

  injector.invoke(ContextPadProvider, this);

  var cached = bind(this.getContextPadEntries, this);

  this.getContextPadEntries = function(element) {
    var actions = cached(element);

    var businessObject = element.businessObject;

    function startConnect(event, element, autoActivate) {
      connect.start(event, element, autoActivate);
    }

    if (isAny(businessObject, [ 'custom:triangle', 'custom:circle'])) {
      assign(actions, {
        'connect': {
          group: 'connect',
          className: 'bpmn-icon-connection-multi',
          title: translate('Connect using custom connection'),
          action: {
            click: startConnect,
            dragstart: startConnect
          }
        }
      });
    }

    return actions;
  };
}

inherits(CustomContextPadProvider, ContextPadProvider);

CustomContextPadProvider.$inject = [
  'injector',
  'connect',
  'translate'
];

module.exports = CustomContextPadProvider;