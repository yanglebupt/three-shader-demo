#define TAU 6.283185307179586
#define PI 3.141592653589793
#pragma glslify: normalizeColor = require(../../glsl-tools/normalize-color)


varying vec3 vNormal;
varying vec2 vUv;

uniform float uvScale;
uniform vec3 color1;
uniform vec3 color2;
uniform float start;
uniform float end;
uniform float time;

vec3 lerpColor(vec3 c1, vec3 c2, float c) {
  return mix(normalizeColor(c1), normalizeColor(c2), c);  // mix 就是 lerp
}

vec3 lerpInverseColor(vec3 c1, vec3 c2, float start, float end, float c) {
  float v = (c - start) / (end - start);
  // fract 返回 x - floor(x)
  /*
    用来做周期，因为一旦 c >= end  就有 v [1,2)，取小数仍然是从 0 开始，直到 v = 2, 然后一直重复
    一旦 c < start  就有 v (-1,0]， v-floor(v) = v + 1 (0, 1]，取完后仍然是从 1 开始
  */
  return mix(normalizeColor(c1), normalizeColor(c2), fract(v)); 
}

void main() {
  gl_FragColor = vec4(vNormal, 1.0);
  // gl_FragColor = vec4(uvScale * vUv, 0.0, 1.0);
  // gl_FragColor = vec4(vUv.xxx, 1.0);
  // gl_FragColor = vec4(normalizeColor(color1), 1.0);
  // 还可以将世界坐标作为 颜色
  // 颜色插值
  // gl_FragColor = vec4(lerpColor(color1, color2, vUv.x), 1.0);
  // gl_FragColor = vec4(lerpInverseColor(color1, color2, start, end, vUv.x), 1.0);
  
  /////////////////// 放在球上可以制作灯笼 /////////////////////////
  // float f = 5.;  // f 频率代表一个单位内可以存在多少个波
  // 周期三角波 abs(2*fract(t)-1)
  // float t = 1. - abs(fract(vUv.x * f) * 2.0 - 1.0);
  // 正弦波 0.5*sin(2πft+φ)+0.5 
  // float phi = 3.0 * PI / 2.0;
  // float t = sin(TAU * f * vUv.x + phi) * 0.5 + 0.5;   
  // gl_FragColor = vec4(t, t, t, 1.0);
  // gl_FragColor = vec4(lerpColor(color1, color2, t), 1.0);
  
  // xy 双重波
  // vec2 t = sin(TAU * f * vUv.xy + phi) * 0.5 + 0.5;
  // gl_FragColor = vec4(t, 0.0, 1.0);
  
  // x 偏移量受 y 位置影响
  // float xOffset = cos(TAU * f * vUv.x) * 0.5;
  // float t = sin(TAU * f * vUv.y + xOffset + time) * 0.5 + 0.5;
  // t *= (1.0 - vUv.y);
  // t *= float(abs(vNormal.y) < 0.999); // 去除顶部
  // gl_FragColor = vec4(t, t, t, t); // 不断透明
}