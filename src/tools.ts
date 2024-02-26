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
const loadTexture = (filename: string, options: TextureOptions = {}) => {
  const tex = texLoader.load(filename)
  Object.keys(options).forEach((k) => {
    Reflect.set(tex, k, options[k as keyof TextureOptions])
  })
  if (filename.includes('hdr')) {
    console.log(tex)
  }
  return tex
}

export { loadTexture }
