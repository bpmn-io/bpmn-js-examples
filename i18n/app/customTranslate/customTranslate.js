import { escapeHTML } from 'diagram-js/lib/util/EscapeUtil';

import translations from './translations';


export default function customTranslate(template, replacements, safe) {

  if (typeof replacements === 'boolean') {
    safe = replacements;
    replacements = {};
  }

  replacements = replacements || {};

  // Translate
  template = translations[template] || template;

  // Replace
  template = template.replace(/{([^}]+)}/g, function(_, key) {
    return replacements[key] || '{' + key + '}';
  });

  // Escape HTML
  return safe ? template : escapeHTML(template)
}