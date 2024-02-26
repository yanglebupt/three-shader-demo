// #version 330 es;

varying vec2 vUv;

const float TAU = 6.283185307179586;
uniform float time;
uniform float intensity;
uniform float stepQ;

////////////////Sin Wave/////////////////////
vec4[7] sinWaveParams(float intensity){  
  vec4 sinWave[7];
  float speed = 0.5;
  sinWave[0] = vec4(intensity, 1.0, 1.0, speed);
  sinWave[1] = vec4(intensity, -1.0, 1.0, speed);

  sinWave[2] = vec4(intensity, 0.5, 0.2, speed);
  sinWave[3] = vec4(intensity, 0.6, 0.1, speed);
  sinWave[4] = vec4(intensity, -0.3, -0.1, speed);
  sinWave[5] = vec4(intensity, -1.0, -0.2, speed);
  sinWave[6] = vec4(intensity, 0.8, -0.3, speed);
  
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

/////////////////Gerstner Wave/////////////////////////
vec3 GerstnerWave(vec3 position, float stepQ, float intensity){
  vec3 vertex = position;
  vec4[7] params = sinWaveParams(intensity);
  for(int i = 0; i < 7; i++){
    vec4 p = params[i];
    // 二维正弦波参数
    float A = stepQ * p.x;
    vec2 K = vec2(p.y, p.z);  // 模长为波长的倒数，方向为波失
    vec2 R = vec2(vertex.x, vertex.y);
    float f = p.w;
    float fi = 0.0;
    vertex.x += A * K.x * sin(TAU * (dot(K, R) + f * time) ); 
    vertex.y += A * K.y * sin(TAU * (dot(K, R) + f * time) ); 
  }

  return SinWave(vertex, intensity);
}

///////////////////////////////////////////////////////

void main(){
  vUv = uv;

  vec3 vertex = GerstnerWave(position, stepQ, intensity);
  
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertex, 1.0);
}