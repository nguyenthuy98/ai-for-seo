import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let localModules = {};
if (process.env.NODE_ENV !== 'test') {
  const modulesFiles = require.context('./modules', true, /\.js$/);
  localModules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);
    // eslint-disable-next-line
    modules[moduleName] = value.default;
    return modules;
  }, {});
}

export default new Vuex.Store({
  modules: {
    ...localModules,
  },
});
