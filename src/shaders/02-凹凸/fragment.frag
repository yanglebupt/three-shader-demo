#define TAU 6.283185307179586

varying vec3 vNormal;
varying vec2 vUv;


// 线性正弦
void main1(){
  float t = sin(vUv.x * 2.0 * TAU * 5.0) * 0.5 + 0.5;
  gl_FragColor = vec4(t, t, t, 1.0);
}

// 中心正弦
void main(){
  float t = sin(length(vUv - 0.5) * 2.0 * TAU * 5.0) * 0.5 + 0.5;
  t*= 0.5*sqrt(2.0) - length(vUv - 0.5);  // 随距离减小
  gl_FragColor = vec4(t, t, t, 1.0);
}