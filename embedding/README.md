# bpmn-js Implicit Keyboard Binding Example

This example shows how implicit keyboard binding introduced in `diagram-js@15.0.0` allows BPMN modeler to coexist with other DOM elements (or even other instances of modeler) and only capture keyboard shortcuts when user is focused on the modeling canvas.

For more information see [pull request](https://github.com/bpmn-io/diagram-js/pull/662) and [changelog](https://github.com/bpmn-io/diagram-js/blob/develop/CHANGELOG.md#1500) for `diagram-js` v15.0.0.

## About

This example is a node-style web application that holds two instances of BPMN modeler and a block of text with custom Select All keyboard shortcut implementation. Red border indicates where the focus is. You can see how each instance of modeler only captures keyboard shortcuts when it's focused and doesn't interfer with other (native or custom) key events.

![demo application screenshot](https://raw.githubusercontent.com/bpmn-io/bpmn-js-examples/main/modeler/docs/screenshot.png "Screenshot of the example application")

## Building

You need a [NodeJS](http://nodejs.org) development stack with [npm](https://npmjs.org) installed to build the project.

To install all project dependencies execute

```
npm install
```

Build the application (including [bpmn-js](https://github.com/bpmn-io/bpmn-js)) via

```
npm run all
```

You may also spawn a development setup by executing

```
npm run dev
```

Both tasks generate the distribution ready client-side modeler application into the `public` folder.

Serve the application locally or via a web server (nginx, apache, embedded).