import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

import './style.css';

import BpmnModeler from 'bpmn-js/lib/Modeler';
import BpmnViewer from 'bpmn-js/lib/Viewer';
import BpmnNavigatedViewer from 'bpmn-js/lib/NavigatedViewer';

const editorMap = {
  'editor': BpmnModeler,
  'viewer': BpmnViewer,
  'navigated-viewer': BpmnNavigatedViewer,
  'default': BpmnModeler
};

const modelers = new Map();

async function openDiagram(element) {

  const diagramURL = element.dataset.diagram;
  const viewerType = element.dataset.editor;

  const BpmnJS = editorMap[viewerType] || editorMap.default;

  const diagramXML = await fetch(diagramURL).then(response => response.text());

  const modeler = new BpmnJS({ container: element });

  modelers.set(element, modeler);

  await modeler.importXML(diagramXML);
}

const elements = document.querySelectorAll('[data-diagram]');

for (const element of elements) {
  openDiagram(element).catch(err => console.error);
}
