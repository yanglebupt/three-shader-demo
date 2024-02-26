import {
  MainApp,
  MainAppOptions,
  loadHDRTexture
} from '@ylbupt/three-game-engine'
import {
  AxesHelper,
  Mesh,
  PlaneGeometry,
  RGBAFormat,
  ShaderLib,
  ShaderMaterial,
  SphereGeometry,
  TextureLoader,
  sRGBEncoding
} from 'three'
import { vertexShader, fragmentShader, uniforms } from '.'
import { GUI } from 'dat.gui'
import { hdrMaterial } from './hdr'
import bgFilename from './hdr/002_1.jpg'

export class App extends MainApp {
  gui: GUI
  constructor(options: MainAppOptions) {
    super(options)
    this.mainCamera.position.set(-0.1, 2, 0.1)
    const gui = new GUI()
    this.gui = gui
    const mat = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms
    })

    const mesh = new Mesh(new PlaneGeometry(1.5, 1.5, 100, 100), mat)
    mesh.position.set(0, 0, 0)
    mesh.rotateX(-Math.PI / 2)
    mesh.geometry.computeTangents() // 需要计算切向量
    console.log(mesh.geometry.attributes)
    this.scene.add(mesh)

    const mesh2 = new Mesh(new SphereGeometry(1, 100, 100), mat)
    mesh2.geometry.computeTangents()
    console.log(mesh2.geometry.attributes)
    mesh2.position.set(2, 0, 0)
    this.scene.add(mesh2)

    this.scene.add(new AxesHelper(3))

    gui.addColor(uniforms.surfaceColor, 'value').name('物体表面颜色')
    gui.addColor(uniforms.fresnelColor, 'value').name('物体边缘颜色')

    gui.add(uniforms.heightIntensity, 'value', 0, 1, 0.01).name('高度贴图强度')
    gui.add(uniforms.normIntensity, 'value', 0, 1, 0.01).name('法线贴图强度')

    gui.add(uniforms.isPointLight, 'value').name('是否是点光源？')
    gui.addColor(uniforms.lightColor, 'value').name('灯光颜色')
    const folder1 = gui.addFolder('灯光方向(平行光)')
    folder1.add(uniforms.lightDirection.value, 'x', -1, 1, 0.01)
    folder1.add(uniforms.lightDirection.value, 'y', -1, 1, 0.01)
    folder1.add(uniforms.lightDirection.value, 'z', -1, 1, 0.01)
    const folder2 = gui.addFolder('灯光位置(点光源)')
    folder2.add(uniforms.lightPosition.value, 'x', -10, 10, 0.01)
    folder2.add(uniforms.lightPosition.value, 'y', -10, 100, 0.01)
    folder2.add(uniforms.lightPosition.value, 'z', -10, 10, 0.01)
    gui
      .add(uniforms.shininess, 'value', 0, 1, 0.01)
      .setValue(0.5)
      .name('光泽度')
    gui
      .add(uniforms.intensity, 'value', 0, 5, 0.01)
      .setValue(1)
      .name('光照强度')

    gui.add(uniforms.envLight, 'value').name('是否开始环境光')
    gui
      .add(uniforms.envIntensity, 'value', 0, 1, 0.01)
      .name('环境光高光强度')
      .setValue(0)
    gui
      .add(uniforms.envMapLevel, 'value', 0, 10, 0.1)
      .name('mipmap')
      .setValue(3)

    this.load()
  }

  // async load() {
  //   // await Promise.all([, /*super.load()*/ this.loadScene()])
  // }

  // 自己实现加载天空球
  async loadScene() {
    const texture = new TextureLoader().load(bgFilename)
    const material = hdrMaterial(texture, this.orbitControl!.target)
    this.scene.add(new Mesh(new PlaneGeometry(1, 1), material))
    // 覆盖原有材质
    // this.scene.overrideMaterial = hdrMaterial(texture) // 所有物体都采样该材质了

    // 注意使用球 + hdr uv 采样也可以，但没有 uv 转换，和普通的贴图一致了
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
