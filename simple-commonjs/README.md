# bpmn-js in CommonJS Applications

[bpmn-js](https://github.com/bpmn-io/bpmn-js) is the BPMN 2.0 diagram modeling and rendering toolkit that powers [bpmn.io](http://bpmn.io).

This example showcases how to integrate [bpmn-js](https://github.com/bpmn-io/bpmn-js) into a node-style application.
It gets [bpmn-js via npm](https://www.npmjs.org/package/bpmn-js) and packages the application for the browser using [browserify](http://browserify.org).


## About

This example uses bpmn-js to embed the [pizza collaboration](http://demo.bpmn.io/s/pizza-collaboration) diagram into a web application.

![demo application screenshot](https://raw.githubusercontent.com/bpmn-io/bpmn-js-examples/master/simple-commonjs/docs/screenshot.png "Screenshot of the example application")


## Usage Summary

Install bpmn-js via [npm](http://npmjs.org)

```
npm install --save bpmn-js
```

Use it in your application

```javascript
var BpmnViewer = require('bpmn-js');


var viewer = new BpmnViewer({ container: '#canvas' });

viewer.importXML(pizzaDiagram, function(err) {

  if (!err) {
    console.log('success!');
    viewer.get('canvas').zoom('fit-viewport');
  } else {
    console.log('something went wrong:', err);
  }
});
```


## Building the Project

Initialize the project dependencies via

```
npm install
```

The project contains a  [Grunt](http://gruntjs.com/) build script that defines a few tasks.

To create the sample distribution in the `dist` folder run

```
grunt
```

To bootstrap a development setup that spawns a small webserver and rebuilds your app on changes run

```
grunt auto-build
```


## License

MIT