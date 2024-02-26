import { MainAppOptions, MainApp } from '@ylbupt/three-game-engine'
import {
  AddEquation,
  AxesHelper,
  CanvasTexture,
  Color,
  CustomBlending,
  CylinderGeometry,
  DoubleSide,
  DstColorFactor,
  GreaterEqualDepth,
  LessEqualDepth,
  Mesh,
  MeshBasicMaterial,
  MultiplyBlending,
  OneFactor,
  OneMinusDstColorFactor,
  PlaneGeometry,
  RepeatWrapping,
  SRGBColorSpace,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
  ZeroFactor
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
      // side: DoubleSide,
      // blending: CustomBlending,
      // blendEquation: AddEquation,
      // blendSrc: OneFactor,
      // blendDst: OneFactor,
      transparent: true
      // depthWrite: false,
      // depthTest: false
    })
    const sphereGeo = new SphereGeometry(1)
    const mesh1 = new Mesh(sphereGeo, mat)
    this.scene.add(mesh1)
    this.meshs.push(mesh1)

    const planeGeo = new PlaneGeometry(1, 10, 10)
    const mesh2 = new Mesh(planeGeo, mat)
    mesh2.position.set(2, 0, 0)
    this.scene.add(mesh2)
    this.meshs.push(mesh2)

    // const cyliGeo = new CylinderGeometry(1, 1, 3)
    // const mesh3 = new Mesh(cyliGeo, mat)
    // mesh3.position.set(-3, 0, 0)
    // const mesh3_1 = new Mesh(
    //   new SphereGeometry(0.5),
    //   new MeshBasicMaterial({
    //     color: 0xff0000
    //   })
    // )
    // mesh3_1.position.set(-3, 0, -2)
    // mesh3_1.renderOrder = 5
    // mesh3.renderOrder = 0
    // this.renderer.sortObjects = true
    // this.renderer.setOpaqueSort((a, b) => b - a)
    // this.renderer.setTransparentSort((a, b) => b - a)
    // this.scene.add(mesh3)
    // this.scene.add(mesh3_1)
    // this.meshs.push(mesh3)

    // 添加 GUI 控件
    this.gui.add(mesh1.rotation, 'x', 0, 2 * Math.PI).name('rotateX')
    this.gui.add(mesh1.rotation, 'y', 0, 2 * Math.PI).name('rotateY')
    this.gui.add(mesh1.rotation, 'z', 0, 2 * Math.PI).name('rotateZ')

    this.gui.add(uniforms.uvScale, 'value', 0.2, 2.5).name('uvScale')
    const folder = this.gui.addFolder('渐变色')

    folder.addColor(uniforms.color1, 'value').name('颜色1')
    folder.addColor(uniforms.color2, 'value').name('颜色2')
    folder.add(uniforms.start, 'value', 0, 1).name('起始点')
    folder.add(uniforms.end, 'value', 0, 1).name('结束点')
    gsap.to(uniforms.time, {
      value: 1000,
      duration: 500
    })
  }
}

export { App }
