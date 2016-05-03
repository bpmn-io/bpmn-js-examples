module.exports = {
  __init__: [ 'customRenderer', 'paletteProvider', 'customRules', 'customUpdater', 'contextPadProvider' ],
  elementFactory: [ 'type', require('./CustomElementFactory') ],
  customRenderer: [ 'type', require('./CustomRenderer') ],
  paletteProvider: [ 'type', require('./CustomPalette') ],
  customRules: [ 'type', require('./CustomRules') ],
  customUpdater: [ 'type', require('./CustomUpdater') ],
  contextPadProvider: [ 'type', require('./CustomContextPadProvider') ]
};
