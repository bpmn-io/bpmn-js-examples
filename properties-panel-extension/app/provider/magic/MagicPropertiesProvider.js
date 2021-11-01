// Require your custom property entries.
import spellProps from './parts/SpellProps';

var LOW_PRIORITY = 500;


// Create the custom magic tab.
// The properties are organized in groups.
function createMagicTabGroups(element, translate) {

  // Create a group called "Black Magic".
  var blackMagicGroup = {
    id: 'black-magic',
    label: 'Black Magic',
    entries: []
  };

  // Add the spell props to the black magic group.
  spellProps(blackMagicGroup, element, translate);

  return [
    blackMagicGroup
  ];
}

/**
 * A provider with a `#getTabs(element)` method
 * that exposes tabs for a diagram element.
 *
 * @param {PropertiesPanel} propertiesPanel
 * @param {Function} translate
 */
export default function MagicPropertiesProvider(propertiesPanel, translate) {

  // API ////////

  /**
   * Return the tabs provided for the given element.
   *
   * @param {DiagramElement} element
   *
   * @return {(Object[]) => (Object[])} tab entry middleware
   */
  this.getTabs = function(element) {

    /**
     * We return a middleware that modifies
     * the existing tabs.
     *
     * @param {Object[]} entries
     *
     * @return {Object[]} modified entries
     */
    return function(entries) {

      // Add the "magic" tab
      var magicTab = {
        id: 'magic',
        label: 'Magic',
        groups: createMagicTabGroups(element, translate)
      };

      entries.push(magicTab);
  
      // Show general + "magic" tab
      return entries;
    }
  };


  // registration ////////

  // Register our custom magic properties provider.
  // use a lower priority to ensure it is loaded after the basic BPMN properties.
  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

MagicPropertiesProvider.$inject = [ 'propertiesPanel', 'translate' ]