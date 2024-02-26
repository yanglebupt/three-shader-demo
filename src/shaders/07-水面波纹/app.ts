import { MainApp, MainAppOptions } from '@ylbupt/three-game-engine'
import { AxesHelper, Mesh, PlaneGeometry, ShaderMaterial } from 'three'
// import { vertexShader, fragmentShader, uniforms } from './Sin-Wave'
// import { vertexShader, fragmentShader, uniforms } from './Gerstner-Wave'
import { vertexShader, fragmentShader, uniforms } from './Fin-wave'
import { GUI } from 'dat.gui'

export class App extends MainApp {
  constructor(options: MainAppOptions) {
    super(options)
    this.mainCamera.position.set(-0.1, 2, 0.1)
    const gui = new GUI()
    const mat = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      wireframe: false
    })

    // const mesh = new Mesh(new PlaneGeometry(3, 3, 500, 500), mat) // Gerstner-Wave 需要更加细分
    const mesh = new Mesh(new PlaneGeometry(3, 3, 100, 100), mat)
    mesh.position.set(0, 0, 0)
    mesh.rotateX(-Math.PI / 2)
    mesh.geometry.computeTangents() // 需要计算切向量
    this.scene.add(mesh)

    this.scene.add(new AxesHelper(3))

    gui.addColor(uniforms.startColor, 'value').name('浅处颜色')
    gui.addColor(uniforms.endColor, 'value').name('深处颜色')
    gui.add(uniforms.intensity, 'value', 0, 1, 0.01).name('波浪强度')

    // Gerstner-Wave
    // gui.add(uniforms.stepQ, 'value', 0, 20, 0.01).name('波浪陡度')

    // Fin-Wave
    gui.add(uniforms.normIntensity, 'value', 0, 1).name('法线强度')
    const f1 = gui.addFolder('两次法线采样 uv')
    f1.add(uniforms.uvParams.value, 'x', -1, 1)
    f1.add(uniforms.uvParams.value, 'y', -1, 1)
    f1.add(uniforms.uvParams.value, 'z', -1, 1)
    f1.add(uniforms.uvParams.value, 'w', -1, 1)
    gui.addColor(uniforms.detailColor, 'value').name('细节颜色')
    gui.add(uniforms.detailIntensity, 'value', 0, 1).name('细节强度')
    gui.add(uniforms.detailIntensity, 'value', 0, 1).name('细节强度')
    const f2 = gui.addFolder('光线方向')
    f2.add(uniforms.lightDir.value, 'x', -1, 1)
    f2.add(uniforms.lightDir.value, 'y', -1, 1)
    f2.add(uniforms.lightDir.value, 'z', -1, 1)
    gui.addColor(uniforms.lightColor, 'value').name('灯光颜色')
    gui.add(uniforms.shininess, 'value', 0, 1).name('高光系数')
    gui.add(uniforms.speIntensity, 'value', 0, 1).name('高光强度')
    gui.add(uniforms.fresIntensity, 'value', 0, 1).name('菲涅尔强度')
  }

  render(): void {
    super.render()
    uniforms.time.value = this.t
  }
}
