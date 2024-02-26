varying vec2 vUv;

uniform sampler2D FoamTexture;
uniform vec3 startColor;
uniform vec3 endColor;

void main(){
  float depth = texture2D(FoamTexture,vUv).r;  // r 分量代表 深度
  vec3 surface = mix(startColor / 255.0, endColor / 255.0, depth);  // 线性插值颜色

  gl_FragColor = vec4(surface, 1.0); 
}