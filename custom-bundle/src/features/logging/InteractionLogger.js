var HIGH_PRIORITY = 1500;


export default function InteractionLogger(eventBus) {

  // we log user clicks
  eventBus.on('element.click', HIGH_PRIORITY, function(evt) {
    console.log('user clicked', evt.element);
  });

}

InteractionLogger.$inject = [ 'eventBus' ];