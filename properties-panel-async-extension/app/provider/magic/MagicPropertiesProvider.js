// Import your custom property entries.
// The entry is a text input field with logic attached to create,
// update and delete the "spell" property.
import spellProps from './parts/SpellProps';

import { is } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 500;


/**
 * A provider with a `#getGroups(element)` method
 * that exposes groups for a diagram element.
 *
 * @param {PropertiesPanel} propertiesPanel
 * @param {Function} translate
 */
export default function MagicPropertiesProvider(propertiesPanel, translate) {

  // API ////////

  /**
   * Return the groups provided for the given element.
   *
   * @param {DiagramElement} element
   *
   * @return {(Object[]) => (Object[])} groups middleware
   */
  this.getGroups = function(element) {

    /**
     * We return a middleware that modifies
     * the existing groups.
     *
     * @param {Object[]} groups
     *
     * @return {Object[]} modified groups
     */
    return function(groups) {

      // Add the "magic" group
      if(is(element, 'bpmn:StartEvent')) {
        groups.push(createMagicGroup(element, translate));
      }

      return groups;
    }
  };


  // registration ////////

  // Register our custom magic properties provider.
  // Use a lower priority to ensure it is loaded after
  // the basic BPMN properties.
  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

MagicPropertiesProvider.$inject = [ 'propertiesPanel', 'translate' ];

// Create the custom magic group
function createMagicGroup(element, translate) {

  // create a group called "Magic properties".
  const magicGroup = {
    id: 'magic',
    label: translate('Magic properties'),
    entries: spellProps(element)
  };

  return magicGroup
}
