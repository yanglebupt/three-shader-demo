#pragma glslify: shininessRemapping = require(./math)

// Blinn 镜面反射
vec3 blinnSpecular(vec3 color, vec3 direction, float intensity, float shininess, vec3 norm, vec3 view){
  vec3 halfVec = normalize(-normalize(direction) + normalize(view));
  float back = float(dot(norm, -normalize(direction)) > 0.0);
  float s = clamp(dot(halfVec, norm), 0.0, 1.0) * back;  // 去除背向的高光
  float shin = shininessRemapping(shininess);
  return pow(s, shin) * intensity * color;
}


#pragma glslify: export(blinnSpecular)