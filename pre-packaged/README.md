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
<!-- required viewer styles -->
<link rel="stylesheet" href="https://unpkg.com/bpmn-js@15.2.0/dist/assets/bpmn-js.css" />

<script src="https://unpkg.com/bpmn-js@15.2.0/dist/bpmn-viewer.development.js"></script>
```

Download the complete [viewer example](https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/main/starter/viewer.html).

#### Modeler

```html
<!-- required modeler styles -->
<link rel="stylesheet" href="https://unpkg.com/bpmn-js@15.2.0/dist/assets/diagram-js.css" />
<link rel="stylesheet" href="https://unpkg.com/bpmn-js@15.2.0/dist/assets/bpmn-js.css" />
<link rel="stylesheet" href="https://unpkg.com/bpmn-js@15.2.0/dist/assets/bpmn-font/css/bpmn.css" />

<script src="https://unpkg.com/bpmn-js@15.2.0/dist/bpmn-modeler.development.js"></script>
```

Download the complete [modeler example](https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/main/starter/modeler.html).


## Use the Library

The library is bundled as an UMD bundle and binds itself to the global `BpmnJS`
variable.

```javascript
var bpmnJS = new BpmnJS({
  container: '#canvas'
});

try {

  await bpmnJS.importXML(someDiagram);

  console.log('success!');
  viewer.get('canvas').zoom('fit-viewport');
} catch (err) {

  console.error('something went wrong:', err);
}
```

## License

MIT
