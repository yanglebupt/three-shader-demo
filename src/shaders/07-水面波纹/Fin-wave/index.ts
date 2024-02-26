import vertexShader from './vertex.vert?raw'
import fragmentShader from './fragment.frag?raw'
import Foam from '../assets/Foam.png'
import Norm from '../assets/water.jpg'
import { loadTexture } from '../../../tools'
import { Color, RepeatWrapping, Vector3, Vector4 } from 'three'

const uniforms = {
  time: { value: 0 },
  FoamTexture: { value: loadTexture(Foam) },
  NormTexture: {
    value: loadTexture(Norm, {
      wrapS: RepeatWrapping,
      wrapT: RepeatWrapping
    })
  },
  startColor: { value: new Color(183, 239, 242) },
  endColor: { value: new Color(13, 123, 122) },
  detailColor: { value: new Color(255, 255, 255) },
  detailIntensity: { value: 1 },
  normIntensity: { value: 0.3 },
  uvParams: { value: new Vector4(-0.04, -0.02, -0.02, -0.04) },
  intensity: { value: 0.01 },
  lightDir: { value: new Vector3(-1, -1, -0.2) },
  lightColor: { value: new Color(255, 255, 255) },
  speIntensity: { value: 0.28 },
  shininess: { value: 0.6 },
  fresIntensity: { value: 0.3 }
}

const params = {}

export { vertexShader, fragmentShader, uniforms, params }
