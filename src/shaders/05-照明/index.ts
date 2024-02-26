import vertexShader from './vertex.vert'
import fragmentShader from './fragment.frag'
import { Color, Vector3 } from 'three'

const uniforms = {
  time: { value: 0 },
  /* 环境光属性 */
  ambientColor: { value: new Color(255.0, 255.0, 255.0) },
  ambientIntensity: { value: 1 },
  /* 高光属性*/
  shininess: { value: 1 },
  /* 平行光属性 */
  lightColor: { value: new Color(255.0, 255.0, 255.0) },
  lightDirection: { value: new Vector3(-1, -1, -1) },
  lightIntensity: { value: 1 },
  /* 物体表面颜色 */
  surfaceColor: { value: new Color(255.0, 255.0, 255.0) },
  cameraPosition: { value: new Vector3(0, 0, 0) }
}

export { vertexShader, fragmentShader, uniforms }
