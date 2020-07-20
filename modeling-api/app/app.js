import BpmnModeler from 'bpmn-js/lib/Modeler';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

import emptyDiagram from '../resources/newDiagram.bpmn';

import { domify } from 'min-dom';

import snippets from './snippets';

hljs.registerLanguage('javascript', javascript);
hljs.initHighlightingOnLoad();

const container = document.querySelector('.modeler');

const modeler = new BpmnModeler({
  container
});

async function openDiagram(xml) {
  try {
    await modeler.importXML(xml);
  } catch (err) {
    console.error(err);
  }
}

function createDiagram() {
  return openDiagram(emptyDiagram);
}

/**
 * Load snippet, display code and show resulting diagram.
 *
 * @param {Function} fn
 */
function loadSnippet(fn) {
  createDiagram().then(() => {

    // (1) Execute snippet
    fn(modeler);

    // (2) Display snippet code
    let code = formatSnippetCode(fn.toString());

    document.querySelector('.snippet__code').textContent = code;

    hljs.highlightBlock(document.querySelector('.snippet__code'));

    // (3) Export to console
    modeler.saveXML({ format: true }).then(({ xml }) => console.info(xml));
  });
}

/**
 * Set up snippets.
 *
 * @param {Array<Object>} snippets
 */
function setUpSnippets(snippets) {
  const snippetsList = document.getElementsByClassName('snippets__list')[ 0 ];

  function handleSnippetClick(snippetsListItem, snippet) {
    snippetsListItems.forEach(({ classList })=> classList.remove('snippets__list-item--active'));
  
    snippetsListItem.classList.add('snippets__list-item--active');
  
    loadSnippet(snippet.fn);
  }

  const snippetsListItems = snippets.map(snippet => {
    const snippetsListItem = domify(
      `<li id="${ snippet.id }" class="snippets__list-item"><h3 class="snippets__list-item-name">${ snippet.name }</h3><p class="snippets__list-item-description">${ snippet.description }</p></li>`);

    snippetsListItem.addEventListener('click', () => {
      handleSnippetClick(snippetsListItem, snippet);
    });

    snippetsList.appendChild(snippetsListItem);

    return snippetsListItem;
  });

  handleSnippetClick(snippetsListItems[ 0 ], snippets[ 0 ]);
}

/**
 * Format snippet code by removing first and last line and
 * removing unnecessary indentation.
 *
 * @param {string} snippetCode
 *
 * @return {string}
 */
function formatSnippetCode(snippetCode) {
  let lines = snippetCode.split('\n');

  // (1) Remove surrounding function block
  lines = lines.slice(1, lines.length - 1);

  // (2) Remove unnecessary indentation
  const indentation = lines.reduce((indentation, line) => {
    line = line.search(/\S/);

    return (line != -1 && line < indentation) ? line : indentation;
  }, Infinity);
  
  return lines.map(line => line.substring(indentation)).join('\n');
}

createDiagram().then(() => setUpSnippets(snippets));