import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import glslify from 'rollup-plugin-glslify' // 模块化 glsl

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true
  },
  assetsInclude: ['**/*.hdr', '**/*.glb'],
  plugins: [basicSsl(), glslify()]
})
