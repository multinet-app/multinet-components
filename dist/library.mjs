import { openBlock, createElementBlock, createVNode, unref, withCtx, createTextVNode } from 'vue';
import VBtn from 'vuetify/lib';

const _hoisted_1 = /*#__PURE__*/createTextVNode(" Normal ");

var script = {
  __name: 'Header',
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createVNode(unref(VBtn), { depressed: "" }, {
      default: withCtx(() => [
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

export { plugin as default };
