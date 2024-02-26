#pragma glslify: normalToWorld = require("../../glsl-tools/normal2world)
#pragma glslify: dirToWorld = require("../../glsl-tools/dir2world)
#pragma glslify: posToWorld = require("../../glsl-tools/pos2world)

#define USE_TANGENT
attribute vec4 tangent;

varying vec2 vUv;
varying vec3 vNorm;
varying vec3 vPos;
varying vec3 vTang;
varying vec3 vBiTang;

uniform sampler2D rockHeightMap;
uniform float heightIntensity;

void main(){
  vUv = uv;
  float hei = texture2D(rockHeightMap,vUv).x * heightIntensity;  // 加载高度贴图
  vec3 vertex = position;
  vertex += normal * hei;  // 注意这里使用的是 mesh 局部法线

  vNorm = normalToWorld(normal, modelMatrix);
  vPos = posToWorld(vertex, modelMatrix);
  // 切线坐标系在世界坐标系中的表示
  vTang = normalize(dirToWorld(tangent.xyz, modelMatrix));
  vBiTang = cross(vNorm, vTang);  

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertex, 1.0);
}