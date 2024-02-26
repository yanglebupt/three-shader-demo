#pragma glslify: normalToWorld = require(../../glsl-tools/normal2world)
#pragma glslify: posToWorld = require(../../glsl-tools/pos2world)


varying vec2 vUv;
varying vec3 vNorm;
varying vec3 vPos;


void main(){
  vUv = uv;
  vNorm = normalToWorld(normal, modelMatrix);
  vPos = posToWorld(position, modelMatrix);
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}