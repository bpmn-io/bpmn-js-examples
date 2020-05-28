# bpmn-js Minimap Example

This example uses [bpmn-js](https://github.com/bpmn-io/bpmn-js) and [diagram-js-minimap](https://github.com/bpmn-io/diagram-js-minimap). It implements a BPMN 2.0 modeler with a minimap that lets you navigate the diagram.

![demo application screenshot](docs/screenshot.png)


## Usage

Add [diagram-js-minimap](https://github.com/bpmn-io/diagram-js-minimap) to your project:

```sh
npm install --save diagram-js-minimap
```

Now load the minimap module along with the [bpmn-js](https://github.com/bpmm-io/bpmn-js) instance:

```javascript
import BpmnModeler from 'bpmn-js/lib/Modeler';

import minimapModule from 'diagram-js-minimap';

var bpmnModeler = new BpmnModeler({
  container: '#canvas',
  additionalModules: [
    minimapModule
  ]
});

await bpmnModeler.importXML(xml);

console.log('Awesome! Ready to navigate!');
```

Checkout [`app/app.js`](app/app.js) for details.


## Run the Example

You need a [NodeJS](http://nodejs.org) development stack with [npm](https://npmjs.org) installed to build the project.

To install all project dependencies execute

```sh
npm install
```

To start the example execute

```sh
npm start
```

To build the example into the `public` folder execute

```sh
npm run all
```
