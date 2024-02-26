#define TAU 6.283185307179586
#pragma glslify: normalToWorld = require(../../glsl-tools/normal2world)

uniform float time;

varying vec3 vNormal;
varying vec2 vUv;


// 平面波起
void main(){
  vUv = uv;
  vNormal = normalToWorld(normal, modelMatrix);
  vec3 pos = position;
  // 这里的改变需要按照未旋转的情况来，同时 物体的 segment 数量要多
  float wavex = cos((vUv.x - time*0.01) * TAU * 15.0) * 0.08;
  float wavey = cos((vUv.y - time*0.01) * TAU * 15.0);
  pos.z = (wavex * wavey);  
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( pos, 1.0 );
}


// 球面波起
void main1(){
  vUv = uv;
  vNormal = normalToWorld(normal, modelMatrix);
  vec3 pos = position;
  // 这里的改变需要按照未旋转的情况来，同时物体的 segment 数量要多
  float varx = (length(vUv - 0.5) - time * 0.01) * TAU * 15.0;
  float wave = sin(varx) * 0.05 / length(vUv - 0.5);
  pos.z = clamp(wave, -2.0, 0.5);  
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( pos, 1.0 );
}