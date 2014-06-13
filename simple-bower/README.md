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

```html
<!-- viewer dependencies -->
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/jquery-mousewheel/jquery.mousewheel.js"></script>
<script src="bower_components/lodash/dist/lodash.js"></script>
<script src="bower_components/sax/lib/sax.js"></script>
<script src="bower_components/Snap.svg/dist/snap.svg.js"></script>

<!-- viewer -->
<script src="bower_components/bpmn-js/bpmn-viewer.js"></script>
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


## License

MIT