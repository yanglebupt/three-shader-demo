import { MainAppOptions, MainApp } from '@ylbupt/three-game-engine'
import {
  AxesHelper,
  Color,
  DoubleSide,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Vector3
} from 'three'
import { uniforms, vertexShader, fragmentShader } from '.'
import { GUI } from 'dat.gui'
import gsap from 'gsap'

class App extends MainApp {
  gui: GUI
  uniforms: Record<string, any>
  meshs: Mesh[] = []
  constructor(options: MainAppOptions) {
    super(options)
    this.gui = new GUI()
    this.uniforms = uniforms
    this.scene.add(new AxesHelper(5))
    this.scene.background = new Color(0x666666) // 保持和 unity 一致
    this.mainCamera.position.set(0.5, 0.5, 5)
    this.lookAt = new Vector3(0, 0, 0)
    const mat = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: DoubleSide
    })
    const planeGeo = new PlaneGeometry(5, 5, 200, 200)
    const mesh1 = new Mesh(planeGeo, mat)
    mesh1.rotateX(Math.PI / 2)
    this.scene.add(mesh1)
    this.meshs.push(mesh1)

    gsap.to(uniforms.time, {
      value: 1000,
      duration: 500
    })
  }
}

export { App }
