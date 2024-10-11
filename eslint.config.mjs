import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

export default [
  {
    ignores: [ '**/public', '**/dist' ],
  },
  ...bpmnIoPlugin.configs.browser,
  ...bpmnIoPlugin.configs.node.map(config => {
    return {
      ...config,
      files: [
        '**/*.config.js',
        '**/*.conf.js',
        '**/server.js',
        '**/test/**/*.js',
      ]
    };
  }),
  ...bpmnIoPlugin.configs.mocha.map(config => {
    return {
      ...config,
      files: [
        '**/test/**/*.js',
      ]
    };
  }),
  {
    files: [ '**/*.js', '**/*.mjs' ],
  }
];