
# bpmn-js bundling example

This example showcases how add and bundle [bpmn-js](https://github.com/bpmn-io/bpmn-js)
along with a node-style web application using [Webpack](https://webpack.js.org).


## About

This example uses bpmn-js to embed the [pizza collaboration](http://demo.bpmn.io/s/pizza-collaboration) diagram into a web application.

![example screenshot](./resources/screenshot.png "Screenshot of the example application")


## Usage Summary

Install bpmn-js via [npm](http://npmjs.org)

```
npm install --save bpmn-js
```

Use it in your application

```javascript
import BpmnViewer from 'bpmn-js';

var viewer = new BpmnViewer({
  container: '#canvas'
});


viewer.importXML(pizzaDiagram).then(function(result) {

  const { warnings } = result;

  console.log('success !', warnings);

  viewer.get('canvas').zoom('fit-viewport');
}).catch(function(err) {

  const { warnings, message } = err;

  console.log('something went wrong:', warnings, message);
});
```

Bundle the `src/app.js` file for the browser with Webpack:

```
webpack ./src/app.js -o public/app.bundled.js --mode development
```

To learn about more bundling options, checkout the [webpack-cli documentation](https://webpack.js.org/api/cli/).

__Note:__ You may use another ES module aware bundler such as [Rollup](https://rollupjs.org), too.
Browserify may also be used but must be properly configured via a global babelify transform.

### Bundling to ES5

If your application needs to support old browsers, you need to transpile the code to ES5.
This can be achieved via

```
npm run build:es5
```

After the operation finishes, run

```
npm run open
```

to open the application in the browser.

Inspect [webpack.es5.config.js](webpack.es5.config.js) to check how webpack can be configured to transpile your application with [babel](https://babeljs.io/).

## Building the Example

Install the project dependencies via

```
npm install
```

To create the sample distribution in the `public` folder run

```
npm run all
```


## License

MIT
