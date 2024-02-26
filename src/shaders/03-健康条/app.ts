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
    mesh.position.set(0, 2, 0)
    mesh.scale.set(-1, 1, 1)
    this.scene.add(mesh)
    this.scene.add(new AxesHelper(3))

    gui.add(uniforms.health, 'value', 0, 1).name('健康值')
    gui.add(uniforms.start, 'value', 0, 1).name('低阈值')
    gui.add(uniforms.end, 'value', 0, 1).name('高阈值')
  }

  render(): void {
    super.render()
    uniforms.time.value = this.t
  }
}
