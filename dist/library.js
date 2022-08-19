'use strict';

var vue = require('vue');
var VBtn = require('vuetify/lib');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var VBtn__default = /*#__PURE__*/_interopDefaultLegacy(VBtn);

const _hoisted_1 = /*#__PURE__*/vue.createTextVNode(" Normal ");

var script = {
  __name: 'Header',
  setup(__props) {


return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("div", null, [
    vue.createVNode(vue.unref(VBtn__default["default"]), { depressed: "" }, {
      default: vue.withCtx(() => [
        _hoisted_1
      ]),
      _: 1 /* STABLE */
    })
  ]))
}
}

};

script.__file = "src/Header.vue";

const components = { Header: script };

const plugin = {
  install (Vue) {
    for (const prop in components) {
      if (components.hasOwnProperty(prop)) {
        const component = components[prop];
        Vue.component(component.name, component);
      }
    }
  }
};

module.exports = plugin;
