import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import './style.css';

import $ from 'jquery';
import BpmnModeler from 'bpmn-js/lib/Modeler';

import {
  debounce
} from 'min-dash';

import transactionBoundariesModule from 'camunda-transaction-boundaries';

import diagramXML from '../resources/transaction-boundaries.bpmn';


var container = $('#js-drop-zone');

var canvas = $('#js-canvas');

var bpmnModeler = new BpmnModeler({
  container: canvas,
  additionalModules: [
    transactionBoundariesModule
  ]
});

function createNewDiagram() {
  openDiagram(diagramXML);
}

async function openDiagram(xml) {

  try {

    await bpmnModeler.importXML(xml);

    container
      .removeClass('with-error')
      .addClass('with-diagram');

    bpmnModeler.get('transactionBoundaries').show();
  } catch (err) {

    container
      .removeClass('with-diagram')
      .addClass('with-error');

    container.find('.error pre').text(err.message);

    console.error(err);
  }
}

function registerFileDrop(container, callback) {

  function handleFileSelect(e) {
    e.stopPropagation();
    e.preventDefault();

    var files = e.dataTransfer.files;

    var file = files[0];

    var reader = new FileReader();

    reader.onload = function(e) {

      var xml = e.target.result;

      callback(xml);
    };

    reader.readAsText(file);
  }

  function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();

    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  container.get(0).addEventListener('dragover', handleDragOver, false);
  container.get(0).addEventListener('drop', handleFileSelect, false);
}


// file drag / drop ///////////////////////

// check file api availability
if (!window.FileList || !window.FileReader) {
  window.alert(
    'Looks like you use an older browser that does not support drag and drop. ' +
    'Try using Chrome, Firefox or the Internet Explorer > 10.');
} else {
  registerFileDrop(container, openDiagram);
}

// bootstrap diagram functions

$(function() {

  createNewDiagram();

  var downloadLink = $('#js-download-diagram');
  var downloadSvgLink = $('#js-download-svg');

  $('.buttons a').click(function(e) {
    if (!$(this).is('.active')) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  function setEncoded(link, name, data) {
    var encodedData = encodeURIComponent(data);

    if (data) {
      link.addClass('active').attr({
        'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
        'download': name
      });
    } else {
      link.removeClass('active');
    }
  }

  var exportArtifacts = debounce(async function() {

    try {

      const { svg } = await bpmnModeler.saveSVG();
      setEncoded(downloadSvgLink, 'diagram.svg', svg);
    } catch (err) {

      console.error('Error happened saving SVG: ', err);
      setEncoded(downloadSvgLink, 'diagram.svg', null);
    }

    try {

      const { xml } = await bpmnModeler.saveXML({ format: true });
      setEncoded(downloadLink, 'diagram.bpmn', xml);
    } catch (err) {

      console.error('Error happened saving XML: ', err);
      setEncoded(downloadLink, 'diagram.bpmn', null);
    }
  }, 500);

  bpmnModeler.on('commandStack.changed', exportArtifacts);
});
