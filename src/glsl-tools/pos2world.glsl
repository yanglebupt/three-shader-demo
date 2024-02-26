vec3 posToWorld(vec3 pos, mat4 matrix){
  vec4 res = matrix * vec4(pos,1.0);
  return vec3(res.x/res.w, res.y/res.w, res.z/res.w);
}

#pragma glslify: export(posToWorld)