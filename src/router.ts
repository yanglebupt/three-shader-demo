// import { App } from './shaders/01-基本使用/app'
// import { App } from './shaders/02-凹凸/app'
// import { App } from './shaders/03-健康条/app'
// import { App } from './shaders/04-SDF有符号距离场/app'
import { App as LightApp } from './shaders/05-照明/app'
import { App as LightMapApp } from './shaders/06-照明贴图相关/app'
import bgFilename from './shaders/06-照明贴图相关/hdr/copy.hdr'
// import { App } from './shaders/07-水面波纹/app'

export interface Route {
  path: string
  name: string
  app: () => MainApp
}

export const routes: Route[] = [
  {
    path: '#light',
    name: '光照模型',
    app: () =>
      new LightApp({
        orbitControl: true
      })
  },
  {
    path: '#light-map',
    name: '光照模型相关贴图应用',
    app: () =>
      new LightMapApp({
        orbitControl: true,
        background: true,
        bgPath: bgFilename
      })
  }
]
