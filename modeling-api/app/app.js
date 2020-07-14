import BpmnModeler from 'bpmn-js/lib/Modeler';

import emptyDiagram from '../resources/newDiagram.bpmn';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

import * as samples from './samples/samples';
import { stripSampleCode } from './samples/samples';


// Initialize js syntax highlighting for all <pre><code>...
hljs.registerLanguage('javascript', javascript);
hljs.initHighlightingOnLoad();

// Initialize the modeler ///////////////////////
const container = document.getElementById('js-canvas');

const modeler = new BpmnModeler({
  container
});

function createNewDiagram() {
  return openDiagram(emptyDiagram);
}

async function openDiagram(xml) {
  const output = document.getElementById('js-drop-zone');

  try {
    await modeler.importXML(xml);

    output.classList.remove('with-error');
    output.classList.add('with-diagram');

  } catch (err) {

    console.error(err);

    output.classList.remove('with-diagram');
    output.classList.add('with-error');

    document.querySelector('#js-drop-zone pre').textContent = err.message;
  }
}

/**
 * Load the sample, display its code in the '#code-payload' element and log the BPMN 2.0 XML
 *
 * @param {function(modeler)} f - Function to call with the modeler as argument.
 */
function loadSample(f) {
  createNewDiagram().then(() => {
    // Load the sample
    f(modeler);

    // get the stripped sample code
    let code = stripSampleCode(f.toString());

    // highlight the code
    document.getElementById('code-payload').textContent = code;
    hljs.highlightBlock(document.getElementById('code-payload'));

    // Log the resulting BPMN 2.0 XML to console
    modeler.saveXML({ format: true }).then(({ xml }) => console.info(xml));
  });
}

// Register the button eventListener
createNewDiagram().then(() => {
  document.getElementById('add-shapes-btn').addEventListener('click', (e) => {
    loadSample(samples.loadSampleOne);
  });

  document.getElementById('add-shape-busObj-btn').addEventListener('click', (e) => {
    loadSample(samples.loadSampleTwo);
  });

  document.getElementById('add-gateway-btn').addEventListener('click', (e) => {
    loadSample(samples.loadSampleThree);
  });

  document.getElementById('bpmn-factory-btn').addEventListener('click', (e) => {
    loadSample(samples.loadSampleFour);
  });

  document.getElementById('bpmn-groups-btn').addEventListener('click', (e) => {
    loadSample(samples.loadSampleFive);
  });

  document.getElementById('bpmn-default-flow-btn').addEventListener('click', (e) => {
    loadSample(samples.loadSampleSix);
  });

  document.getElementById('bpmn-collab-btn').addEventListener('click', (e) => {
    loadSample(samples.loadSampleSeven);
  });

  document.getElementById('bpmn-collab-lanes-btn').addEventListener('click', (e) => {
    loadSample(samples.loadSampleEight);
  });

});