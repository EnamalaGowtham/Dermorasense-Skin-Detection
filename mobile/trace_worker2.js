const Module = require('module');
const originalLoad = Module._load;
Module._load = function(request, parent, isMain) {
  const exports = originalLoad.apply(this, arguments);
  if (request.endsWith('plugins.js')) {
    const originalResolvePlugin = exports.resolvePlugin;
    exports.resolvePlugin = function(name, dirname) {
      if (name === 'react-native-worklets/plugin') {
        require('fs').appendFileSync('C:\\Users\\gouth\\Desktop\\New version dermorasense\\mobile\\trace_output2.txt', 'BINGO! resolvePlugin called with name: ' + name + ' from dirname: ' + dirname + '\n\n');
      }
      return originalResolvePlugin.apply(this, arguments);
    };
  }
  return exports;
};
