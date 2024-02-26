import vertexShader from './vertex.vert?raw'
import fragmentShader from './fragment.frag?raw'
import Foam from '../assets/Foam.png'
import { loadTexture } from '../../../tools'
import { Color } from 'three'

const uniforms = {
  time: { value: 0 },
  FoamTexture: { value: loadTexture(Foam) },
  startColor: { value: new Color(183, 239, 242) },
  endColor: { value: new Color(13, 123, 122) },
  intensity: { value: 0.03 /* 0.01 */ }
}

const params = {}

export { vertexShader, fragmentShader, uniforms, params }
