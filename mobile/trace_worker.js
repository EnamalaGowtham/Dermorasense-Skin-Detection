const Module = require('module');
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function(request, parent, isMain, options) {
  if (request === 'react-native-worklets/plugin' || request === 'react-native-worklets') {
    require('fs').appendFileSync('C:\\Users\\gouth\\Desktop\\New version dermorasense\\mobile\\trace_output.txt', 'BINGO! Resolving: ' + request + '\nParent: ' + (parent ? parent.filename : 'none') + '\n\n');
  }
  return originalResolve.apply(this, arguments);
};
