/// <reference types="vite/client" />

declare module '*.jpg'
declare module '*.png'
declare module '*.glb'
declare module '*.hdr'
declare module '*.vert'
declare module '*.frag'

interface MainApp {
  destroy: () => void
}

interface Window {
  app: MainApp
}
