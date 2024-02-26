#pragma glslify: shininessRemapping = require(./math)

// Phong 镜面反射，(高光)，平滑表面沿着一个方向反射，如果视角和反射方向差太远就看不到高光了
vec3 phongSpecular(vec3 color, vec3 direction, float intensity, float shininess, vec3 norm, vec3 view){
  float s = clamp(dot(normalize(reflect(normalize(direction), norm)), normalize(view)), 0.0, 1.0);  
  return pow(s, shininessRemapping(shininess)) * intensity * color;
}


#pragma glslify: export(phongSpecular)