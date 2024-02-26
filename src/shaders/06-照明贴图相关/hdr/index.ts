import vertexShader from './vertex.vert?raw'
import fragmentShader from './fragment.frag?raw'
import { BackSide, ShaderMaterial, Texture, Vector3 } from 'three'

export const hdrMaterial = (texture: Texture, lookAt: Vector3) => {
  return new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: { hdrTexture: { value: texture }, lookAt: { value: lookAt } },
    side: BackSide
  })
}
