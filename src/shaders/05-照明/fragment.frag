#pragma glslify: diffusion = require(../../glsl-tools/lights/lambert-diffusion)
#pragma glslify: phongSpecular = require(../../glsl-tools/lights/phong-specular)
#pragma glslify: blinnSpecular = require(../../glsl-tools/lights/blinn-specular)
#pragma glslify: fresnelLight = require(../../glsl-tools/lights/fresnel)



varying vec2 vUv;
varying vec3 vNorm;
varying vec3 vPos;

uniform float shininess;
uniform vec3 surfaceColor;

uniform vec3 lightColor;
uniform vec3 lightDirection;
uniform float lightIntensity;

uniform vec3 ambientColor;
uniform float ambientIntensity;


// 注意归一化方向和颜色

const float ambi_k = 0.005;

void main(){
  vec3 view = cameraPosition - vPos;
  vec3 sur = surfaceColor / 255.0;
  vec3 ambi = ambientIntensity * ambientColor;
  vec3 diff = diffusion(lightColor / 255.0, lightDirection, lightIntensity, vNorm);
  vec3 spe = blinnSpecular(lightColor / 255.0, lightDirection, lightIntensity, shininess, vNorm, view);
  vec3 fres = fresnelLight(lightColor / 255.0, view, vNorm);
  gl_FragColor = vec4(ambi_k * ambi + (1.0 - ambi_k) * diff + spe + fres, 1.0);
}