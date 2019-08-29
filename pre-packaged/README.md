# bpmn-js pre-packaged example

This example showcases how to use the pre-packaged version(s) of [bpmn-js](https://github.com/bpmn-io/bpmn-js).


## About

We provide pre-packaged versions of our toolkit via [unpkg](https://unpkg.com/bpmn-js/dist/).

This example shows how to embed these resources to integrate a BPMN viewer or editor
into a website.


## Embed pre-packaged Assets

Download or simply include the relevant dependencies into your website:

#### Viewer

```html
<script src="https://unpkg.com/bpmn-js@5.0.3/dist/bpmn-viewer.development.js"></script>
```

Download the complete [viewer example](https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/master/starter/viewer.html).

#### Modeler

```html
<!-- necessary stylesheets -->
<link rel="stylesheet" href="https://unpkg.com/bpmn-js@5.0.3/dist/assets/diagram-js.css" />
<link rel="stylesheet" href="https://unpkg.com/bpmn-js@5.0.3/dist/assets/bpmn-font/css/bpmn.css" />

<script src="https://unpkg.com/bpmn-js@5.0.3/dist/bpmn-modeler.development.js"></script>
```

Download the complete [modeler example](https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/master/starter/modeler.html).


## Use the Library

The library is bundled as an UMD bundle and binds itself to the global `BpmnJS`
variable.

```javascript
var bpmnJS = new BpmnJS({
  container: '#canvas'
});

bpmnJS.importXML(someDiagram, function(err) {

  if (!err) {
    console.log('success!');
    viewer.get('canvas').zoom('fit-viewport');
  } else {
    console.log('something went wrong:', err);
  }
});
```

## License

MIT
