import BpmnViewer from 'bpmn-js/lib/Viewer';

/**
 * @typedef { import('diagram-js/lib/core/Types').ElementLike } ElementLike
 * @typedef { import('diagram-js/lib/core/ElementRegistry').default } ElementRegistry
 * @typedef { import('diagram-js/lib/core/EventBus').Event } Event
 */

/**
 * @type { HTMLElement }
 */
const container = document.querySelector('#canvas');

const viewer = new BpmnViewer({
  container
});

// type-safe event handler
viewer.on('element.hover', (/** @type { { element: ElementLike } & Event } */ event) => {

  if (event.element.id === 'MY_TASK') {
    console.log('hovered MY_TASK');

    event.preventDefault();
  }
});

// type-safe access to components

/**
 * @type { ElementRegistry }
 */
const elementRegistry = viewer.get('elementRegistry');

const element = elementRegistry.get('MY_TASK');

console.log(element.id); // MY_TASK