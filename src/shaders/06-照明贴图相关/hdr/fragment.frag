varying vec2 vUv;

uniform sampler2D hdrTexture;
uniform vec3 lookAt;

const float TAU = 6.283185307179586;

vec2 hdrCoord(vec3 dir){
  float x = atan(dir.z, dir.x) / TAU + 0.5; // -pi pi
  float y = dir.y * 0.5 + 0.5;   // -1-1
  return vec2(x, y);
}

void main(){
  vec4 color = texture2D(hdrTexture, hdrCoord(lookAt));
  gl_FragColor = color;
}