#define TAU 6.283185307179586
#pragma glslify: normMapToWorld = require("../../glsl-tools/normal-map)
#pragma glslify: diffusion = require(../../glsl-tools/lights/lambert-diffusion)
#pragma glslify: blinnSpecular = require(../../glsl-tools/lights/blinn-specular)
#pragma glslify: fresnelLight = require(../../glsl-tools/lights/fresnel)


varying vec2 vUv;
varying vec3 vNorm;
varying vec3 vPos;
varying vec3 vTang;
varying vec3 vBiTang;

uniform bool isPointLight;
uniform vec3 lightColor;
uniform vec3 lightDirection;
uniform vec3 lightPosition;
uniform float intensity;
uniform float shininess;

uniform vec3 fresnelColor;

uniform vec3 surfaceColor;
uniform sampler2D rockColorMap;
uniform sampler2D rockNormMap;
uniform float normIntensity;

uniform sampler2D envMap;
uniform float envMapLevel;

uniform bool envLight;
uniform float envIntensity;


// 获取不同光源的方向
vec3 getLightDirection(vec3 worldPos) {
  // 平行光
  // 点光源为起点，指向物体
  return normalize(isPointLight ? worldPos - lightPosition: lightDirection);
}

vec3 getViewDirection(vec3 worldPos) {
  return normalize(cameraPosition - worldPos);
}

vec2 hdrCoord(vec3 dir){
  float x = atan(dir.z, dir.x) / TAU + 0.5; // [-pi pi] / 2*pi + 0.5  --> 0-1，角度作为 uv 采样的 x
  float y = dir.y * 0.5 + 0.5;   // [-1 1] * 0.5 + 0.5 --> 0-1
  return vec2(x, y);
}

void main(){
  // 处理法向贴图
  vec3 worldNorm = normMapToWorld(rockNormMap, vUv, normIntensity, vTang, vBiTang, vNorm);

  vec3 lightDir = getLightDirection(vPos);
  vec3 view = getViewDirection(vPos);

  // 表面颜色和材质颜色
  vec3 surfaceMixColor = texture2D(rockColorMap, vUv).rgb * surfaceColor / 255.0;

  // 漫反射
  vec3 amblient = diffusion(lightColor / 255.0, lightDir, intensity, worldNorm);
  // 高光
  vec3 spe = blinnSpecular(lightColor / 255.0, lightDir, intensity, shininess, worldNorm, view);
  // 菲涅尔
  vec3 fres = fresnelLight(fresnelColor / 255.0, view, worldNorm);

  if(envLight){
    // 环境漫反射，法线转 uv 坐标
    vec3 envAmb = textureLod(envMap, hdrCoord(worldNorm), envMapLevel).rgb;
    amblient += envAmb;
    
    // 环境高光，反射视角转 uv 采样，注意 reflect 中的 view 需要乘以 -1
    vec3 envSpe = textureLod(envMap, hdrCoord(normalize(reflect(-view, worldNorm))), envMapLevel).rgb;
    spe += envSpe * envIntensity; 
  }

  gl_FragColor = vec4(spe + fres + amblient * surfaceMixColor, 1.0); 
}