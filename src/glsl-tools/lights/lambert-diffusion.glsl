// lambert 漫反射，粗糙表面均匀反射，和视角无关
// env_k 环境光强度，防止背面完全黑
vec3 diffusion(vec3 color, vec3 direction, float intensity, vec3 norm){
  return clamp(dot(norm, -normalize(direction)), 0.0, 1.0) * intensity * color;
}

#pragma glslify: export(diffusion)