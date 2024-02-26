// fresnel 
vec3 fresnelLight(vec3 color, vec3 view, vec3 norm){
  return (1.0 - dot(normalize(view),norm) - 0.5)  * color;
}

#pragma glslify: export(fresnelLight)