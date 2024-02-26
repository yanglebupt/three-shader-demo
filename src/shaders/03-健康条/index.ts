import vertexShader from './vertex.vert'
// import fragmentShader from './fragment.frag' // 健康条颜色版
import fragmentShader from './fragment1.frag' // 健康条纹理版
import { ClampToEdgeWrapping } from 'three'
import healthBar from './assets/health-bar.png'
import { loadTexture } from '../../tools'

const uniforms = {
  health: { value: 0.5 },
  start: { value: 0.1 },
  end: { value: 0.9 },
  healthTex: {
    value: loadTexture(healthBar, {
      wrapS: ClampToEdgeWrapping,
      wrapT: ClampToEdgeWrapping
    })
  },
  time: { value: 0 }
}

export { vertexShader, fragmentShader, uniforms }
