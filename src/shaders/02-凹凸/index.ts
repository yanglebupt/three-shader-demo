import vertex from './vertex.vert'
import fragment from './fragment.frag'

const uniforms = {
  time: { value: 0 }
}

export { vertex as vertexShader, fragment as fragmentShader, uniforms }
