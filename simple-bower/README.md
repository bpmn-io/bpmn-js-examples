# bpmn-js bower example

[bpmn-js](https://github.com/bpmn-io/bpmn-js) is the BPMN 2.0 diagram modeling and rendering toolkit that powers [bpmn.io](http://bpmn.io).

This example showcases how pull [bpmn-js](https://github.com/bpmn-io/bpmn-js) into a web application via [bower](http://bower.io).


## About

This example uses bpmn-js to embed the [pizza collaboration](http://demo.bpmn.io/s/pizza-collaboration) diagram into a web application.

![demo application screenshot](https://raw.githubusercontent.com/bpmn-io/bpmn-js-examples/master/simple-bower/docs/screenshot.png "Screenshot of the example application")


## Usage Summary

Install bpmn-js via [bower](http://bower.io)

```
bower install --save bpmn-js
```

Embed it and its dependencies into a website

#### Embed the Viewer

```html
<script src="bower_components/bpmn-js/dist/bpmn-viewer.js"></script>
```

#### Embed the Modeler

```html
<script src="bower_components/bpmn-js/dist/bpmn-modeler.js"></script>
```

Use it in your application

```javascript
var BpmnViewer = window.BpmnJS;


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

Make sure you serve the application via a web server (nginx, apache or for testing just `python -m SimpleHTTPServer 8080`) and ensure that the diagrams you want to access are either on the same server or [CORS](https://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing) is enabled.

## License

MIT
