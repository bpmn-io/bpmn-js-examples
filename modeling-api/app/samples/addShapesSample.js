export default function loadSample(modeler) {

  /*
  * Retrieve APIs from the modeler instance
  * - elementRegistry: a registry that keeps track of all shapes in the diagram
  * - modeling: an API to perform BPMN 2.0 modeling operations
  * - canvas: the main drawing canvas
  */
  const elementRegistry = modeler.get('elementRegistry'),
        modeling = modeler.get('modeling'),
        canvas = modeler.get('canvas');

  // Get the root element, which is the bpmn:Process
  const root = canvas.getRootElement();

  /*
  * Get the start Event
  * See https://github.com/bpmn-io/diagram-js/blob/develop/test/spec/core/ElementRegistrySpec.js
  * for more ways to retrieve elements from the registry
  */
  const startEvent = elementRegistry.get('StartEvent_1');

  /*
  * Using the modeling API, the task is appended to the existing diagram,
  * this includes the creation of the connection, which is another shape
  */
  modeling.appendShape(startEvent,
    {
      type: 'bpmn:Task'
    },
    {
      x: Number(startEvent.x) + 200,
      y: Number(startEvent.y) + Number(startEvent.height) / 2
    },
    root);

  // As we can see, the root has now 3 children: the startEvent, the connection and the task
  console.info(`The root element has ${root.children.length} children, which are: `);
  console.info(root.children);

}