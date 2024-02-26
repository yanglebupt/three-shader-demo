// M 转置的逆 * norm  注意不要把平移变换用到 法向上，平移不会影像法向
// M 不一定正交 当我们把几何变换限制为旋转和平移时才是正交，缩放和错切不是正交变换
vec3 normalToWorld(vec3 norm, mat4 modelMatrix) {
  mat3 matrix = mat3(modelMatrix);
  vec3 res = inverse(transpose(matrix)) * norm;
  return normalize(res); // 注意 归一化，因为两个归一化向量插值后不一定是归一化的
}

#pragma glslify: export(normalToWorld)