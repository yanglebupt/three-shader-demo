uniform float health;  // 0-1
uniform float start;
uniform float end;

varying vec2 vUv;
/*
  1. 背景颜色黑色
  2. 0.15<health<0.85，血条颜色从绿色到红色，之外保持
*/
float lerpInverse(float start, float end, float c) {
  // 而线性渐变 是 逆线性函数 (start,0),(end,1)，求解 c 处值
  float v = (c - start) / (end - start);  
  return v;
}

void main(){
  // 1. 小于 health 为血条颜色，大于 为背景颜色
  float isBg = float(vUv.x > health);
  // 2. 0-1 映射到 0.15-0.85
  float inColor = clamp(lerpInverse(start,end,health), 0.0, 1.0); 
  vec3 forntColor = mix(vec3(1.0,0.0,0.0), vec3(0.0,1.0,0.0), inColor);  // 插值2
 
  // 插值
  vec3 bgColor = vec3(0.0, 0.0, 0.0);
  vec3 finColor = mix(forntColor, bgColor, isBg); 
  gl_FragColor = vec4(finColor, 1.0); 

  // 设置背景颜色为透明
  // gl_FragColor = vec4(forntColor, 1.0-isBg); 
}