vec3 normalizeColor(vec3 color) {
  return color / 255.0;
}

#pragma glslify: export(normalizeColor)