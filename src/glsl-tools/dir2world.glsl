// 平移不会影响切向
vec3 dirToWorld(vec3 dir, mat4 matrix){
  mat3 modeMatrix = mat3(matrix);
  return modeMatrix * dir;
}

#pragma glslify: export(dirToWorld)