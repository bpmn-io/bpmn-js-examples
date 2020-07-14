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

  // We use the elementFactory to create participants
  const participant1 = elementFactory.createParticipantShape(),
        participant2 = elementFactory.createParticipantShape();

  // Name the particiants
  participant1.businessObject.name = 'Participant 1';
  participant2.businessObject.name = 'Participant 2';

  /*
  * We add one participant and therefore transfrom the process into a collaboration.
  * Notice that the modeling API will take care of many things under the hood:
  * the startEvent will automatically be included in the collaboration
  * and the dimensioning of the participant shape will always ensure that this
  * is also visually the case (to avoid creating an invalid diagram).
  * The BPMN 2.0 XML structure will be updated (see traversion below).
  */
  modeling.createShape(participant1,
    {
      x: startEvent.x + 200,
      y: startEvent.y + startEvent.height / 2
    }, root);

  /*
  * The second participant will be added to the collaboration. Since the startEvent
  * is already included in the other participant, this time the startEvent will not
  * be referenced and also not be included visually
  */
  modeling.createShape(participant2, { x: startEvent.x + 200, y: startEvent.y + 350 }, root);

  console.info(''
    .concat('The parent of "startEvent" is the process which is referenced in the participant1: ',
      participant1.businessObject.processRef.id == startEvent.businessObject.$parent.id));

  console.info(''
    .concat('Notice that a collaboration was automatically added, so to create a vaid BPMN 2.0: ',
      participant1.businessObject.$parent.$type));

}