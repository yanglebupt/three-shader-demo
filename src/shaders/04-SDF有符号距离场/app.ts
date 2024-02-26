import { MainApp, MainAppOptions } from '@ylbupt/three-game-engine'
import {
  AxesHelper,
  BackSide,
  Mesh,
  PlaneGeometry,
  ShaderMaterial
} from 'three'
import { vertexShader, fragmentShader, uniforms } from '.'
import { GUI } from 'dat.gui'

export class App extends MainApp {
  constructor(options: MainAppOptions) {
    super(options)
    const gui = new GUI()
    const geo = new PlaneGeometry(5, 0.5)
    const mat = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: BackSide,
      transparent: true
    })
    const mesh = new Mesh(geo, mat)
    mesh.position.set(0, 0, 0)
    mesh.scale.set(-1, 1, 1)
    this.scene.add(mesh)
    this.scene.add(new AxesHelper(3))
  }

  render(): void {
    super.render()
    uniforms.time.value = this.t
  }
}
