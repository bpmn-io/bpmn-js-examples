# A simple discussion app

[bpmn-js](https://github.com/bpmn-io/bpmn-js) is the BPMN 2.0 diagram modeling and rendering toolkit that powers [bpmn.io](http://bpmn.io).

This example showcases how to build a simple discussion app based on [bpmn-js](https://github.com/bpmn-io/bpmn-js) and the [bpmn-js-embedded-comments](https://github.com/bpmn-io/bpmn-js-embedded-comments) extension.


## About

This example uses bpmn-js to embed the [pizza collaboration](http://demo.bpmn.io/s/pizza-collaboration) diagram into a web application and add the ability to put comments on individual tasks.

![demo application screenshot](https://raw.githubusercontent.com/bpmn-io/bpmn-js-examples/master/commenting/docs/screenshot.png "Screenshot of the example application")

The comments are added to an elements `<bpmn:documentation>` tag and may be downloaded along with the element.


## Building

One time installation of all dependencies via [npm](https://npmjs.org):

```
npm install
```


Building the app into the `dist` directory and opening it in a browser:

```
npm run dev
```


## License

MIT