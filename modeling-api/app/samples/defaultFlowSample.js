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

  // Create shapes and connections
  const task1 = elementFactory.createShape({ type: 'bpmn:Task' }),
        task2 = elementFactory.createShape({ type: 'bpmn:Task' }),
        task3 = elementFactory.createShape({ type: 'bpmn:Task' }),
        exclusiveGateway = elementFactory.createShape({ type: 'bpmn:ExclusiveGateway' }),
        flow1 = elementFactory.createConnection({ type: 'bpmn:SequenceFlow' }),
        flow2 = elementFactory.createConnection({ type: 'bpmn:SequenceFlow' });

  /*
  * Make one flow the default flow of the gateway
  * Note we are using the businessObjects (ie., the BPMN 2.0 XML element representation
  * in bpmn-moddle) again to update the respective BPMN 2.0 XML property
  */
  exclusiveGateway.businessObject.default = flow1.businessObject;

  // Append the shapes
  modeling.appendShape(startEvent,
    task1,
    {
      x: Number(startEvent.x) + 200,
      y: Number(startEvent.y) + Number(startEvent.height) / 2
    },
    root);
  modeling.appendShape(task1,
    exclusiveGateway,
    {
      x: Number(task1.x) + 200,
      y: Number(task1.y) + Number(task1.height) / 2
    },
    root);

  // The remaining shapes we create manually
  modeling.createShape(task2,
    {
      x: Number(exclusiveGateway.x) + 200,
      y: Number(exclusiveGateway.y) + Number(exclusiveGateway.height) / 2 + 80
    },
    root);
  modeling.createShape(task3,
    {
      x: Number(exclusiveGateway.x) + 200,
      y: Number(exclusiveGateway.y) + Number(exclusiveGateway.height) / 2 - 80
    },
    root);

  /*
  * We manually add connections - note that flow1 will be the default flow,
  * which is defined in businessObject of the exclusiveGateway
  */
  modeling.createConnection(exclusiveGateway, task2, flow1, root);
  modeling.createConnection(exclusiveGateway, task3, flow2, root);

}