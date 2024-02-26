varying vec2 vUv;

// SDF 简单例子
void main1(){
  vec2 normUv = vUv * 2.0 - 1.0;
  float v = length(normUv) - 0.45; // 边界 x^2+y^2-r^2==0 
  v = step(0.0, v);
  gl_FragColor = vec4(v,v,v,1.0); 
}

/*
  通过 SDF 来实现 圆角矩阵
*/
void clip(float v){
  if( v < 0.0 ){
    discard;
  }
}

void main(){
  vec2 coords = vUv;
  coords.x *= 8.0;   // 相当于取 1/8 进行圆角
  // 1. 获取中心点
  vec2 center = vec2(clamp(coords.x, 0.5, 7.5 ), 0.5);
  float sdf = distance(center, coords) * 2.0;  // 将距离归一化 0.5 * 2.0 --》 1.0 
  clip(1.0-sdf);  // 根据 sdf 进行裁剪四个角，不渲染四个角，或者可以设置透明度为0
  float borderSdf = sdf + 0.3; // 外界内缩
  float borderMask = 1.0 - step(1.0, borderSdf);  // 通过 step 获取 0-1 mask 图片

  gl_FragColor = vec4(borderMask, borderMask, borderMask, 1.0); 
}