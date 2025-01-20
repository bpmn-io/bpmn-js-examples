import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

import './style.css';

import BpmnModeler from 'bpmn-js/lib/Modeler';
import BpmnViewer from 'bpmn-js/lib/Viewer';
import BpmnNavigatedViewer from 'bpmn-js/lib/NavigatedViewer';

import Clipboard from 'diagram-js/lib/features/clipboard/Clipboard';

const editorMap = {
  'editor': BpmnModeler,
  'viewer': BpmnViewer,
  'navigated-viewer': BpmnNavigatedViewer
};

const sharedClipboard = {
  'clipboard': [ 'value', new Clipboard() ]
};

const additionalModulesMap = {
  'first-modeler': [
    sharedClipboard
  ],
  'second-modeler': [
    sharedClipboard
  ]
};

const modelers = new Map();

function createModeler(viewerType, config, id) {

  const BpmnJS = editorMap[viewerType] || BpmnModeler;

  const additionalModules = additionalModulesMap[id] || [];

  return new BpmnJS({
    ...config,
    additionalModules
  });
}

async function openDiagram(element) {

  const diagramURL = element.dataset.diagram;
  const viewerType = element.dataset.editor;
  const id = element.id || '__default';

  const modeler = createModeler(viewerType, { container: element }, id);

  modelers.set(element, modeler);

  const diagramXML = await fetch(diagramURL).then(response => response.text());

  await modeler.importXML(diagramXML);
}

const elements = document.querySelectorAll('[data-diagram]');

for (const element of elements) {
  openDiagram(element).catch(err => console.error);
}
