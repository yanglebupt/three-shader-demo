// 当血条小于 0.15 开始闪烁
#define TAU 6.283185307179586

uniform float health;  // 0-1
uniform sampler2D healthTex;
uniform float start;
uniform float time;

varying vec2 vUv;

void main(){
  // 1. 小于 health 为血条颜色，大于 为背景颜色
  float isBg = float(vUv.x > health);
  vec3 forntColor = texture2D(healthTex, vec2(health, vUv.y)).rgb;
  float wave = sin(TAU * time) / 2.0 * 0.7 + 0.65; // 设置闪烁的频率和幅度
  float t = mix(1.0, wave, float(health < start));  // 设置何时开始闪烁
  gl_FragColor = vec4(forntColor * t * (1.0 - isBg), 1.0);  // 乘法不改变色调，不要使用加法
}