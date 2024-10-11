import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

export default [
  {
    ignores: [ '**/public' ],
  },
  ...bpmnIoPlugin.configs.browser,
  ...bpmnIoPlugin.configs.node,
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