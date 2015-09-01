'use strict';

var BpmnJS = window.BpmnJS,
    $ = window.jQuery;

var viewer = new BpmnJS({ container: '#diagram' });

function showDiagram(diagramXML) {

  viewer.importXML(diagramXML, function() {

    var overlays = viewer.get('overlays'),
        canvas = viewer.get('canvas'),
        elementRegistry = viewer.get('elementRegistry');

    // option 1: highlight via CSS class
    canvas.addMarker('OrderReceivedEvent', 'highlight');


    // option 2: highlight via overlay

    var shape = elementRegistry.get('CalmCustomerTask');

    var $overlayHtml = $('<div class="highlight-overlay">')
                            .css({
                              width: shape.width,
                              height: shape.height
                            });

    overlays.add('CalmCustomerTask', {
      position: {
        top: 0,
        left: 0
      },
      html: $overlayHtml
    });
  });
}

// load + show diagram
$.get('resources/pizza-collaboration.bpmn', showDiagram);
