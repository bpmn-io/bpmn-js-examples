# bpmn-js embedding example

This example shows how different versions of the toolkit can be embedded easily into a HTML page.

> [!NOTE]
> Starting with [bpmn-js@18](https://github.com/bpmn-io/bpmn-js/blob/develop/CHANGELOG.md#1800) diagram containers are focusable elements that play nicely with others.

## About

This example embedds different variants of the BPMN toolkit into a larger website. You can see how each instance of modeler only captures keyboard shortcuts when it's focused and doesn't interfer with other (native or custom) elements.

![demo application screenshot](https://raw.githubusercontent.com/bpmn-io/bpmn-js-examples/main/embedding/docs/screenshot.png "Screenshot of the example application")

## Building

You need a [NodeJS](http://nodejs.org) development stack with [npm](https://npmjs.org) installed to build the project.

To install all project dependencies execute

```
npm install
```

Spawn the demo by executing

```
npm start
```

Both tasks generate the distribution ready client-side modeler application into the `public` folder.
