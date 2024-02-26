// shininess 越大，表明越光滑，高光越小越集中，反之，越大越分散，极限就是漫反射
float shininessRemapping(float v){
  return exp2(v*11.0) + 2.0;
}

#pragma glslify: export(shininessRemapping)