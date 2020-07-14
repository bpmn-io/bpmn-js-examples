export default function loadSample(modeler) {

  /*
  * Retrieve APIs from the modeler instance
  * - elementFactory: a factory for diagram-js shapes
  * - elementRegistry: a registry that keeps track of all shapes in the diagram
  * - modeling: an API to perform BPMN 2.0 modeling operations
  * - canvas: the main drawing canvas
  */
  const elementFactory = modeler.get('elementFactory'),
        elementRegistry = modeler.get('elementRegistry'),
        modeling = modeler.get('modeling'),
        canvas = modeler.get('canvas');

  // Get the root element
  const root = canvas.getRootElement();

  // Get the start Event
  const startEvent = elementRegistry.get('StartEvent_1');

  // Create shapes
  const task1 = elementFactory.createShape({ type: 'bpmn:Task' }),
        task2 = elementFactory.createShape({ type: 'bpmn:Task' }),
        task3 = elementFactory.createShape({ type: 'bpmn:Task' }),
        parallelGateway = elementFactory.createShape({ type: 'bpmn:ParallelGateway' });

  // Append the first task and gateway (ie. including connection)
  modeling.appendShape(startEvent,
    task1,
    {
      x: Number(startEvent.x) + 200,
      y: Number(startEvent.y) + Number(startEvent.height) / 2
    },
    root);
  modeling.appendShape(task1,
    parallelGateway,
    {
      x: Number(task1.x) + 200,
      y: Number(task1.y) + Number(task1.height) / 2
    },
    root);

  // Add the remaining shapes to the diagram without connections
  modeling.createShape(task2,
    {
      x: Number(parallelGateway.x) + 200,
      y: Number(parallelGateway.y) + Number(parallelGateway.height) / 2 + 80
    },
    root);
  modeling.createShape(task3,
    {
      x: Number(parallelGateway.x) + 200,
      y: Number(parallelGateway.y) + Number(parallelGateway.height) / 2 - 80
    },
    root);

  // We explicitly connect the respective shapes
  modeling.createConnection(parallelGateway, task2, {
    type: 'bpmn:SequenceFlow'
  },
  root);
  modeling.createConnection(parallelGateway, task3, {
    type: 'bpmn:SequenceFlow'
  },
  root);

}