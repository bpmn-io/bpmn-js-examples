# bpmn-js Transaction Boundaries Example

This example uses [bpmn-js](https://github.com/bpmn-io/bpmn-js) and [camunda-transaction-boundaries](https://github.com/bpmn-io/camunda-transaction-boundaries). It implements a BPMN 2.0 modeler that allows you to visualize transaction boundaries in the diagram.

![demo application screenshot](docs/screenshot.png "Screenshot of the modeler + transaction boundaries example")


## Usage

Add [camunda-transaction-boundaries](https://github.com/bpmn-io/camunda-transaction-boundaries) to your project:

```
npm install --save camunda-transaction-boundaries
```

Now extend the [bpmn-js](https://github.com/bpmm-io/bpmn-js) modeler with the transaction boundaries module (cf. [`src/app.js`](src/app.js#L14) for details).

```javascript
import BpmnModeler from 'bpmn-js/lib/Modeler';

import transactionBoundariesModule from 'camunda-transaction-boundaries';

var canvas = $('#js-canvas');

var bpmnModeler = new BpmnModeler({
  container: canvas,
  additionalModules: [
    transactionBoundariesModule
  ]
});

await bpmnModeler.importXML(xml);

var transactionBoundaries = bpmnModeler.get('transactionBoundaries');
transactionBoundaries.show();

```


## Building the Example

You need a [NodeJS](http://nodejs.org) development stack with [npm](https://npmjs.org) installed to build the project.

To install all project dependencies execute

```
npm install
```

Build the example using [webpack](https://webpack.js.org/) via

```
npm run all
```

You may also spawn a development setup by executing

```
npm run dev
```

Both tasks generate the distribution ready client-side modeler application into the `public` folder.

Serve the application locally or via a web server (nginx, apache, embedded).
