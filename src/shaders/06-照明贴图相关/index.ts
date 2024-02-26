import vertexShader from './vertex.vert'
import fragmentShader from './fragment.frag'
import { Color, Vector3 } from 'three'
import { loadTexture } from '../../tools'

import rock from './Bricks078_1K-JPG/Bricks078_1K_Color.jpg'
import rockNorm from './Bricks078_1K-JPG/Bricks078_1K_NormalGL.jpg'
import rockHeight from './Bricks078_1K-JPG/Bricks078_1K_Displacement.jpg'

import envMap from './hdr/002_1.jpg'

const uniforms = {
  time: { value: 0 },
  shininess: { value: 1 },
  intensity: { value: 1 },
  surfaceColor: { value: new Color(255.0, 255.0, 255.0) },
  lightColor: { value: new Color(255.0, 255.0, 255.0) },
  fresnelColor: { value: new Color(255.0, 255.0, 255.0) },
  lightDirection: { value: new Vector3(-1, -1, -1) },
  lightPosition: { value: new Vector3(0, 1, 0) },
  cameraPosition: { value: new Vector3(0, 0, 0) },
  isPointLight: { value: true },
  envLight: { value: true },
  rockColorMap: { value: loadTexture(rock) },
  rockNormMap: { value: loadTexture(rockNorm) },
  rockHeightMap: { value: loadTexture(rockHeight) },
  normIntensity: { value: 1 },
  heightIntensity: { value: 0.1 },
  envMap: { value: loadTexture(envMap) },
  envIntensity: { value: 0.02 },
  envMapLevel: { value: 7 }
}

const params = {}

export { vertexShader, fragmentShader, uniforms, params }
