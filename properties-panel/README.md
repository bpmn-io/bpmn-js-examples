# bpmn-js Modeler + Properties Panel Example

This example uses [bpmn-js](https://github.com/bpmn-io/bpmn-js) and [bpmn-js-properties-panel](https://github.com/bpmn-io/bpmn-js-properties-panel). It implements a BPMN 2.0 modeler that allows you to edit execution related properties via a properties panel.


## About

This example is a node-style web application that builds a user interface around the bpmn-js BPMN 2.0 modeler.

![demo application screenshot](https://raw.githubusercontent.com/bpmn-io/bpmn-js-examples/master/properties-panel/docs/screenshot.png "Screenshot of the modeler + properties panel example")


## Building

You need a [NodeJS](http://nodejs.org) development stack with [npm](https://npmjs.org) and [grunt](http://gruntjs.com) installed to build the project.

To install all project dependencies execute

```
npm install
```

Build the example using [browserify](http://browserify.org) via

```
grunt
```

You may also spawn a development setup by executing

```
grunt auto-build
```

Both tasks generate the distribution ready client-side modeler application into the `dist` folder.

Serve the application locally or via a web server (nginx, apache, embedded).