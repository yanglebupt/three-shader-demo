// [0-1] 转 [-1,1]
vec3 unpackNormMap(vec4 normMap){
  return normMap.rgb * 2.0 - 1.0;
}

// TBN 矩阵
mat3 TBN_Matrix(vec3 tang, vec3 biTang, vec3 norm){
  return mat3(tang, biTang, norm);
}

vec3 normMapToWorld(sampler2D normTexture, vec2 uv, float intensity, vec3 tang, vec3 biTang, vec3 norm){
  vec3 tbn_normal = unpackNormMap(texture2D(normTexture, uv));
  return normalize(TBN_Matrix(tang, biTang, norm) * mix(vec3(0.0, 0.0, 1.0), tbn_normal, intensity));
}

#pragma glslify: export(normMapToWorld)
