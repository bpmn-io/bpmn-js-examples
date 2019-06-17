# bpmn-js i18n Example

This example shows how to easily translate the strings displayed in [bpmn-js](https://github.com/bpmn-io/bpmn-js) to another language.

![Screenshot](resources/screenshot.png)

## Usage Summary

The custom translation function is provided as an additional module when [bpmn-js](https://github.com/bpmn-io/bpmn-js) is instantiated. The default translation implementation is thereby overwritten.

```javascript
var customTranslate = {
  translate: [ 'value', require('./custom-translate/custom-translate') ]
};

var modeler = new BpmnModeler({
  // ...
  additionalModules: [
    customTranslate
  ]
});
```

You can use your own implementation for translation. The function has two arguments (a template string and an optional object with replacements) and must return the translated string. The example provides two main functionalities: translating and replacing template strings.

Translating a string:

```javascript
var translations = {
  'Append': 'Anhängen'
};

//...

translate('Append'); // Returns 'Anhängen'
```

Translating a template string:

```javascript
var translations = {
  'Append {element}': '{element} anhängen'
};

//...

translate('Append {element}', {element: 'Gateway'}); // Returns 'Gateway anhängen'
```

A list of all available template strings of [bpmn-js](https://github.com/bpmn-io/bpmn-js) as well as existing translations can be found in the [bpmn-js-i18n repository](https://github.com/bpmn-io/bpmn-js-i18n).


## Run the Example

You need a [NodeJS](http://nodejs.org) development stack with [npm](https://npmjs.org) installed to build the project.

To install all project dependencies execute

```sh
npm install
```

To start the example execute

```sh
npm start
```

To build the example into the `public` folder execute

```sh
npm run all
```