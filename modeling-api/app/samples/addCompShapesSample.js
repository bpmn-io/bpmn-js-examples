export default function loadSample(modeler) {

  /*
  * Retrieve APIs from the modeler instance
  * - elementFactory: a factory for diagram-js shapes
  * - elementRegistry: a registry that keeps track of all shapes in the diagram
  * - bpmnFactory: a factory for bpmn-moddle elements
  * - modeling: an API to perform BPMN 2.0 modeling operations
  * - canvas: the main drawing canvas
  */
  const elementRegistry = modeler.get('elementRegistry'),
        elementFactory = modeler.get('elementFactory'),
        bpmnFactory = modeler.get('bpmnFactory'),
        modeling = modeler.get('modeling'),
        canvas = modeler.get('canvas');

  // Get the root element
  const root = canvas.getRootElement();

  // Use elementRegistry and elementFactory to get and create shapes
  const startEvent = elementRegistry.get('StartEvent_1'),
        task = elementFactory.createShape({ type: 'bpmn:Task' }),
        boundaryEvent = elementFactory.createShape({ type: 'bpmn:BoundaryEvent' }),
        compensationTask = elementFactory.createShape({ type: 'bpmn:Task' }),
        association = elementFactory.createConnection({ type: 'bpmn:Association' });

  /*
  * Use bpmnFactory to create BPMN 2.0 elements which are not directly represented as shapes.
  * The created elements are represented again as bpmn-moddle elements which model
  * valid BPMN 2.0 XML elements (see https://github.com/bpmn-io/bpmn-moddle/tree/master/resources/bpmn)
  */
  const errorEventDef = bpmnFactory.create('bpmn:CompensateEventDefinition');

  /*
  * Note that the elementFactory can also be used to create shapes
  * and directly link them with elementDefinitions, see here:
  * https://github.com/bpmn-io/bpmn-js/blob/develop/test/spec/features/modeling/ElementFactorySpec.js#L79
  */

  // Logically attach boundaryEvent to task
  boundaryEvent.host = task;

  /*
  * Set BPMN 2.0 compliant properties using the businessObject (the BPMN 2.0 Moddle representation)
  * (see https://github.com/bpmn-io/bpmn-moddle/blob/master/resources/bpmn/json/bpmn.json)
  */
  boundaryEvent.businessObject.attachedToRef = task.businessObject;
  boundaryEvent.businessObject.eventDefinitions = [errorEventDef];
  compensationTask.businessObject.isForCompensation = true;
  association.businessObject.associationDirection = 'One';

  modeling.appendShape(startEvent, task,
    {
      x: Number(startEvent.x) + 200,
      y: Number(startEvent.y) + Number(startEvent.height) / 2
    },
    root);
  modeling.appendShape(task, boundaryEvent,
    {
      x: task.x + 52,
      y: task.y + 80
    },
    root);
  modeling.appendShape(task, compensationTask,
    {
      x: task.x + 200,
      y: task.y + 180 },
    root);

  /*
  * Manually connect using the existing connection
  * (since we modified the businessObject of that connection
  */
  modeling.connect(boundaryEvent, compensationTask, association, root);

}