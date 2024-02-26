import vertex from './vertex.vert'
import fragment from './fragment.frag'
import { Color } from 'three'

const uniforms = {
  uvScale: { value: 1 },
  color1: { value: new Color(255, 0, 0) },
  color2: { value: new Color(0, 255, 0) },
  start: { value: 0.5 },
  end: { value: 0.8 },
  time: { value: 0 }
}

export { vertex as vertexShader, fragment as fragmentShader, uniforms }
