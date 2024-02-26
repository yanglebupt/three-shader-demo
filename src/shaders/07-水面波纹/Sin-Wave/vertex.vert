varying vec2 vUv;

const float TAU = 6.283185307179586;
uniform float time;
uniform float intensity;

////////////////Sin Wave/////////////////////
vec4[7] sinWaveParams(float intensity){  
  // 一维的
  // vertex.z += 0.1 * cos(vertex.x * TAU + TAU * 2.0 * time);

  vec4 sinWave[7];
  sinWave[0] = vec4(intensity, 1.0, 1.0, 1.0);
  sinWave[1] = vec4(intensity, -1.0, 1.0, 1.0);

  sinWave[2] = vec4(intensity, 0.5, 0.2, 1.0);
  sinWave[3] = vec4(intensity, 0.6, 0.1, 1.0);
  sinWave[4] = vec4(intensity, -0.3, -0.1, 1.0);
  sinWave[5] = vec4(intensity, -1.0, -0.2, 1.0);
  sinWave[6] = vec4(intensity, 0.8, -0.3, 1.0);
  
  return sinWave;
}

vec3 SinWave(vec3 position, float intensity){
  vec3 vertex = position;
  vec4 params[7] = sinWaveParams(intensity);
  for(int i = 0; i < 7; i++){
    vec4 p = params[i];
    // 二维正弦波参数
    float A = p.x;
    vec2 K = vec2(p.y, p.z);  // 波长的倒数
    vec2 R = vec2(vertex.x, vertex.y);
    float f = p.w;
    float fi = 0.0;
    vertex.z += A * cos(TAU * (dot(K, R) + f * time) ); 
  }
  return vertex;
}

void main(){
  vUv = uv;
  vec3 vertex = SinWave(position, intensity);
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertex, 1.0);
}