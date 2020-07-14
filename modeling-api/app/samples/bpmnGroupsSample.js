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

  // Create shapes using the elementFactory
  const task1 = elementFactory.createShape({ type: 'bpmn:Task' }),
        task2 = elementFactory.createShape({ type: 'bpmn:Task' }),
        group = elementFactory.createShape(
          {
            type: 'bpmn:Group',
            height: 150,
            width: 300
          });

  /*
  * The elementFactory ensures that each element has a unique ID so to ensure
  * a proper BPMN 2.0 XMl at all times
  */
  console.info(`task1 has the unique id: ${task1.id}`);

  // Append bpmn:task (incl. the connection)
  modeling.appendShape(startEvent, task1,
    {
      x: Number(startEvent.x) + 150,
      y: Number(startEvent.y) + Number(startEvent.height) / 2
    },
    root);
  modeling.appendShape(task1, task2,
    {
      x: Number(task1.x) + 200,
      y: Number(task1.y) + Number(task1.height) / 2
    },
    root);

  /*
  * Directly add the group, note that a group has no logical
  * relation to the tasks (which it groups only visually)
  */
  modeling.createShape(group, { x: task1.x + 125, y: task1.y + task1.height / 2 }, root);

}