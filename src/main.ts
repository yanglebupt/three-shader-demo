// import { App } from './shaders/01-基本使用/app'
// import { App } from './shaders/02-凹凸/app'
// import { App } from './shaders/03-健康条/app'
// import { App } from './shaders/04-SDF有符号距离场/app'
import { App as LightApp } from './shaders/05-照明/app'
import { App as LightMapApp } from './shaders/06-照明贴图相关/app'
import bgFilename from './shaders/06-照明贴图相关/hdr/copy.hdr'
// import { App } from './shaders/07-水面波纹/app'

const routes = [
  {
    path: '#light',
    app: () =>
      new LightApp({
        orbitControl: true
      })
  },
  {
    path: '#light-map',
    app: () =>
      new LightMapApp({
        orbitControl: true,
        background: true,
        bgPath: bgFilename
      })
  }
]

function createAppByHash() {
  const func = routes.find((r) => r.path == location.hash)
  if (!func) return
  window.app?.destroy()
  window.app = func.app()
}

window.onload = () => {
  if (location.hash) createAppByHash()
  else location.hash = '#light'
}

window.addEventListener('hashchange', createAppByHash)
