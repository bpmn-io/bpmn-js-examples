import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

import './style.css';

import BpmnModeler from 'bpmn-js/lib/Modeler';

const modelers = new Map();

async function openDiagram(element) {

  const diagramURL = element.dataset.diagram;

  const diagramXML = await fetch(diagramURL).then(response => response.text());

  const modeler = new BpmnModeler({ container: element });

  modelers.set(element, modeler);

  await modeler.importXML(diagramXML);
}

const elements = document.querySelectorAll('[data-diagram]');

for (const element of elements) {
  openDiagram(element).catch(err => console.error);
}
