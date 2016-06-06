# bpmn-js colors

This example shows how to add colors to BPMN diagrams rendered with [bpmn-js](https://github.com/bpmn-io/bpmn-js).


## About

The example shows two different approaches how to add colors to your BPMN diagrams.

![demo application screenshot](https://raw.githubusercontent.com/bpmn-io/bpmn-js-examples/master/colors/screenshot.png "Screenshot of the example application")

The following options exist: 

* [Color via Markiers + CSS classes]()
* [Color via Overlays]()
* [Color via Custom Renderer]()

See below for details on each of the approaches.


## Usage Summary

Include [bpmn-js](https://github.com/bpmn-io/bpmn-js) via [Bower](https://github.com/bpmn-io/bpmn-js-examples/tree/master/simple-bower) or [CommonJS](https://github.com/bpmn-io/bpmn-js-examples/tree/master/simple-commonjs) and set it up:


```javascript
var diagramXML = 'put your BPMN 2.0 process XML here';

var viewer = new BpmnJS({ container: '#diagram' });
```


## Adding Colors

#### Option 1: Colors via CSS Styling

Add a CSS snippet like the following to your HTML file:

```css
.highlight:not(.djs-connection) .djs-visual > :nth-child(1) {
  fill: green !important; /* color elements as green */
}
```

The snippet ensures that elements with the `highlight` class get a SVG fill of `green`.

After import, add the `highlight` class as a element marker to the every element you would like to see colored in green:

```javascript
viewer.importXML(diagramXML, function() {

  var canvas = viewer.get('canvas');

  canvas.addMarker('UserTask_1', 'highlight');
});
```


#### Option 2: Colors via Overlay

> This example assumes you have [jQuery](http://jquery.com/) installed.

Add a CSS snippet like the following to your HTML file:

```css
.highlight-overlay {
  background-color: green; /* color elements as green */
  opacity: 0.4;
  pointer-events: none; /* no pointer events, allows clicking through onto the element */
}
```

```javascript
viewer.importXML(diagramXML, function() {

  var overlays = viewer.get('overlays'),
      elementRegistry = viewer.get('elementRegistry');

  var shape = elementRegistry.get('UserTask_1');

  var $overlayHtml = $('<div class="highlight-overlay">')
                          .css({
                            width: shape.width,
                            height: shape.height
                          });

  overlays.add('UserTask_1', {
    position: {
      top: -5,
      left: -5
    },
    html: $overlayHtml
  });
});
```


#### Option 3: Colors via Custom Renderer

Checkout [bpmn-js-task-priorities](https://github.com/bpmn-io/bpmn-js-task-priorities) for an example that provides a [custom renderer](https://github.com/bpmn-io/bpmn-js-task-priorities/blob/master/lib/priorities/ColorRenderer.js) to color shapes and connections dynamically.


## Run this Example

Fetch dependencies:

```
bower install
```

Serve example via static webserver, i.e. using Apache, Nginx, [static](https://github.com/cloudhead/node-static) or pythons webserver module:

```
> python -m SimpleHTTPServer
Serving HTTP on 0.0.0.0 port 8000 ...
```

Visit page at [127.0.0.1:8000](http://127.0.0.1:8000).


## License

MIT
