#define TAU 6.283185307179586
#pragma glslify: normalToWorld = require(../../glsl-tools/normal2world)

varying vec3 vNormal;
varying vec2 vUv;

void main() {
  vUv = uv;
  vNormal = normalToWorld(normal, modelMatrix);
  vec4 pos = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
  // float wave = cos(vUv.y * 2. * TAU * 5.) * .5;
  // pos.y += wave; // 凹凸贴图原理
  gl_Position = pos;
}