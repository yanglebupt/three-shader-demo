import {
  MagnificationTextureFilter,
  Mapping,
  MinificationTextureFilter,
  PixelFormat,
  TextureDataType,
  TextureEncoding,
  TextureLoader,
  Wrapping
} from 'three'
import { Route } from './router'

interface TextureOptions {
  image?: TexImageSource | OffscreenCanvas
  mapping?: Mapping
  /* 设置 uv 采样超过0-1范围时，如何处理，可以重复、镜像、边缘等方式*/
  wrapS?: Wrapping
  wrapT?: Wrapping
  magFilter?: MagnificationTextureFilter
  minFilter?: MinificationTextureFilter
  format?: PixelFormat
  type?: TextureDataType
  anisotropy?: number
  encoding?: TextureEncoding
}

const texLoader = new TextureLoader()
export const loadTexture = (filename: string, options: TextureOptions = {}) => {
  const tex = texLoader.load(filename)
  Object.keys(options).forEach((k) => {
    Reflect.set(tex, k, options[k as keyof TextureOptions])
  })
  if (filename.includes('hdr')) {
    console.log(tex)
  }
  return tex
}

function createAppByHash(routes: Route[]) {
  const func = routes.find((r) => r.path == location.hash)
  if (!func) return
  window.app?.destroy()
  window.app = func.app()
}

export function useRoutes(routes: Route[], id = 'nav') {
  window.onload = () => {
    if (location.hash) createAppByHash(routes)
    else location.hash = '#light'
  }
  window.addEventListener('hashchange', () => createAppByHash(routes))
  let nav = document.getElementById(id)
  if (nav == null) {
    nav = document.createElement('nav')
    nav.id = id
    document.body.appendChild(nav)
  }
  routes.forEach((route) => {
    const a = document.createElement('a')
    a.href = route.path
    a.innerText = route.name
    nav!.appendChild(a)
  })
}
