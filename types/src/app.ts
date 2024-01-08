import BpmnViewer from 'bpmn-js/lib/Viewer';

import {
  ElementLike
} from 'diagram-js/lib/core/Types';

import ElementRegistry from 'diagram-js/lib/core/ElementRegistry';

const container = document.querySelector('#canvas') as HTMLElement;

const viewer = new BpmnViewer({
  container
});

// type-safe event handler
viewer.on<{
  element: ElementLike
}>('element.hover', event => {

  if (event.element.id === 'MY_TASK') {
    console.log('hovered MY_TASK');

    event.preventDefault();
  }
});

// type-safe access to components
const elementRegistry = viewer.get<ElementRegistry>('elementRegistry');

const element = elementRegistry.get('MY_TASK')!;

console.log(element.id); // MY_TASK