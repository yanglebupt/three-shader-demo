import { MainApp, MainAppOptions } from '@ylbupt/three-game-engine'
import {
  AxesHelper,
  BackSide,
  BoxGeometry,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  SphereGeometry
} from 'three'
import { vertexShader, fragmentShader, uniforms } from '.'
import { GUI } from 'dat.gui'

export class App extends MainApp {
  gui: GUI
  constructor(options: MainAppOptions) {
    super(options)
    const gui = new GUI()
    this.gui = gui
    const geo = new SphereGeometry(1.5, 100, 100)
    const mat = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms
    })
    const mesh = new Mesh(geo, mat)
    mesh.position.set(0, 0, 0)
    this.scene.add(mesh)

    const mesh2 = new Mesh(new BoxGeometry(2, 2, 2), mat)
    mesh2.position.set(3, 0, 0)
    this.scene.add(mesh2)
    this.scene.add(new AxesHelper(3))

    gui.addColor(uniforms.surfaceColor, 'value').name('表面颜色')

    gui
      .add(uniforms.shininess, 'value', 0, 1, 0.01)
      .setValue(0.5)
      .name('光泽度')

    gui.addColor(uniforms.ambientColor, 'value').name('环境光颜色')
    gui
      .add(uniforms.ambientIntensity, 'value', 0, 0.5, 0.01)
      .setValue(0.15)
      .name('环境光强度')

    gui
      .add(uniforms.lightIntensity, 'value', 0, 1, 0.01)
      .setValue(0.5)
      .name('光照强度')
    gui.addColor(uniforms.lightColor, 'value').name('灯光颜色')
    const folder = gui.addFolder('灯光方向')
    folder.add(uniforms.lightDirection.value, 'x', -1, 1, 0.01).name('x')
    folder.add(uniforms.lightDirection.value, 'y', -1, 1, 0.01).name('y')
    folder.add(uniforms.lightDirection.value, 'z', -1, 1, 0.01).name('z')
  }

  render(): void {
    super.render()
    uniforms.time.value = this.t
    uniforms.cameraPosition.value = this.mainCamera.position
  }
  destroy(): void {
    super.destroy()
    this.gui.destroy()
  }
}
