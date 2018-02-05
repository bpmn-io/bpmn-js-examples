'use strict';

var HIGH_PRIORITY = 1500;


function InteractionLogger(eventBus) {

  // we log user clicks
  eventBus.on('element.click', HIGH_PRIORITY, function(evt) {
    console.log('user clicked', evt.element);
  });

}

InteractionLogger.$inject = [ 'eventBus' ];

module.exports = InteractionLogger;