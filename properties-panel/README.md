# bpmn-js Modeler + Properties Panel Example

This example uses [bpmn-js](https://github.com/bpmn-io/bpmn-js) and [bpmn-js-properties-panel](https://github.com/bpmn-io/bpmn-js-properties-panel). It implements a BPMN 2.0 modeler that allows you to edit execution related properties via a properties panel.


## About

This example is a node-style web application that builds a user interface around the bpmn-js BPMN 2.0 modeler.

![demo application screenshot](https://raw.githubusercontent.com/bpmn-io/bpmn-js-examples/master/properties-panel/docs/screenshot.png "Screenshot of the modeler + properties panel example")


## Usage

Add the [properties panel](https://github.com/bpmn-io/bpmn-js-properties-panel) to your project:

```
npm install --save bpmn-js-properties-panel
```

Additionally, if you'd like to use [Camunda BPM](https://camunda.org) execution related properties, include the [camunda-bpmn-moddle](https://github.com/camunda/camunda-bpmn-moddle) dependency which tells the modeler about `camunda:XXX` extension properties:

```
npm install --save camunda-bpmn-moddle
```

Now extend the [bpmn-js](https://github.com/bpmn-io/bpmn-js) modeler with two properties panel related modules, the panel itself and a provider module that controls which properties are visible for each element. Additionally you must pass an element via `propertiesPanel.parent` into which the properties panel will be rendered (cf. [`app/index.js`](https://github.com/bpmn-io/bpmn-js-examples/blob/master/properties-panel/app/index.js#L16) for details).

```javascript
var propertiesPanelModule = require('bpmn-js-properties-panel'),
    // providing camunda executable properties, too
    propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/camunda'),
    camundaModdleDescriptor = require('camunda-bpmn-moddle/resources/camunda');

var bpmnModeler = new BpmnModeler({
  container: '#js-canvas',
  propertiesPanel: {
    parent: '#js-properties-panel'
  },
  additionalModules: [
    propertiesPanelModule,
    propertiesProviderModule
  ],
  // needed if you'd like to maintain camunda:XXX properties in the properties panel
  moddleExtensions: {
    camunda: camundaModdleDescriptor
  }
});
```


## Building the Example

You need a [NodeJS](http://nodejs.org) development stack with [npm](https://npmjs.org) and installed to build the project.

To install all project dependencies execute

```
npm install
```

Build the example using [browserify](http://browserify.org) via

```
npm run all
```

You may also spawn a development setup by executing

```
npm run dev
```

Both tasks generate the distribution ready client-side modeler application into the `dist` folder.

Serve the application locally or via a web server (nginx, apache, embedded).
