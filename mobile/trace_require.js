const Module = require('module');
const originalRequire = Module.prototype.require;
Module.prototype.require = function(id) {
  if (id === 'react-native-worklets/plugin') {
    console.error('BINGO! Someone required worklets plugin!');
    console.error(new Error().stack);
  }
  return originalRequire.apply(this, arguments);
};
require('child_process').execSync('npx expo export -c', { stdio: 'inherit' });
