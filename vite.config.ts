import { defineConfig } from 'vite';
import { resolve } from 'path';

import vue from '@vitejs/plugin-vue2'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        VuetifyResolver(),
      ],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'MultinetComponents',
      // the proper extensions will be added
      fileName: 'multinet-components',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'vuetify/lib'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          'vuetify/lib': 'vuetify',
        }
      }
    }
  }
})
