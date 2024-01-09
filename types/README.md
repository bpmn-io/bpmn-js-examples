# Types

[bpmn-js](https://github.com/bpmn-io/bpmn-js) and [diagram-js](https://github.com/bpmn-io/diagram-js) expose type declarations. Editor tooling picks up these declarations to offer advanced completion, and validation. This example shows you to use the type declarations as you embed the libraries.

## Usage

Ensure you enabled your editor and environment to provide type hints.

#### With JavaScript

```javascript
import BpmnViewer from 'bpmn-js/lib/Viewer';

/**
 * @typedef { import('diagram-js/lib/core/ElementRegistry').default } ElementRegistry
 */

/**
 * @type { HTMLElement }
 */
const container = document.querySelector('#canvas');

const viewer = new BpmnViewer({
  container
});

// type-safe access to components

/**
 * @type { ElementRegistry }
 */
const elementRegistry =  viewer.get('elementRegistry');

const element = elementRegistry.get('MY_TASK');

console.log(element.id); // MY_TASK
```

Checkout the [full example](./src/app.js).


#### With [TypeScript](https://www.typescriptlang.org/)

```typescript
import BpmnViewer from 'bpmn-js/lib/Viewer';

import ElementRegistry from 'diagram-js/lib/core/ElementRegistry';

const container = document.querySelector('#canvas') as HTMLElement;

const viewer = new BpmnViewer({
  container
});

// type-safe access to components
const elementRegistry = viewer.get<ElementRegistry>('elementRegistry');

const element = elementRegistry.get('MY_TASK')!;

console.log(element.id); // MY_TASK
```

Checkout the [full example](./src/app.ts).


## Validation

Use `tsc` in validation mode to check that you use bpmn-js in an intended manner:

```sh
# ensure you have typescript installed
npm install typescript

# check if types are properly used
npx tsc --noEmit --checkJs **/*.js
```

See also [configuring TypeScript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).
