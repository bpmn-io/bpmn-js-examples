module.exports = {
  __init__: [ 'customRenderer', 'paletteProvider', 'customRules', 'customUpdater', 'customModel' ],
  customModel: [ 'type', require('./CustomModel')],
  elementFactory: [ 'type', require('./CustomElementFactory') ],
  customRenderer: [ 'type', require('./CustomRenderer') ],
  paletteProvider: [ 'type', require('./CustomPalette') ],
  customRules: [ 'type', require('./CustomRules') ],
  customUpdater: [ 'type', require('./CustomUpdater') ]
};
