varying vec2 vUv;
varying vec3 vNorm;
varying vec3 vPos;
varying vec3 vTang;
varying vec3 vBiTang;
varying vec3 vView;
varying mat3 tangToWorldMatrix;

uniform sampler2D FoamTexture;
uniform vec3 startColor;
uniform vec3 endColor;
uniform float time;
uniform sampler2D NormTexture;
uniform float normIntensity;
uniform vec4 uvParams;

uniform vec3 detailColor;
uniform float detailIntensity;

uniform vec3 lightDir;
uniform vec3 lightColor;
uniform float speIntensity;
uniform float shininess;
uniform float fresIntensity;

const float TAU = 6.283185307179586;


vec3 unPackNormMap(vec4 normMap){
  return normMap.rgb * 2.0 - 1.0;
}

vec3 blenderNorm(vec3 n1, vec3 n2){
  return normalize(vec3(n1.xy + n2.xy, n1.z * n2.z));
}


// 漫反射
vec3 diffusion(vec3 color, vec3 direction, float intensity, vec3 norm){
  return clamp(dot(norm, -normalize(direction)), 0.0, 1.0) * intensity * color;
}

float shininessRemapping(float v){
  return exp2(v*11.0) + 2.0;
}

// Phong 镜面反射
vec3 phoneSpecular(vec3 color, vec3 direction, float intensity, float shininess, vec3 norm, vec3 view){
  float s = clamp(dot(normalize(reflect(normalize(direction), norm)), normalize(view)), 0.0, 1.0);  
  return pow(s, shininessRemapping(shininess)) * intensity * color;
}

// Blinn-Phong 镜面反射
vec3 blinnPhoneSpecular(vec3 color, vec3 direction, float intensity, float shininess, vec3 norm, vec3 view){
  vec3 halfVec = normalize(-normalize(direction) + normalize(view));
  float back = float(dot(norm, -normalize(direction)) > 0.0);
  float s = clamp(dot(halfVec, norm), 0.0, 1.0) * back;  // 去除背向的高光
  float shin = shininessRemapping(shininess);
  return pow(s, shin) * intensity * color;
}

// fresnel 
vec3 fresnelLight(vec3 color, vec3 view, vec3 norm){
  return (1.0 - dot(normalize(view),norm) - 0.5)  * color;
}


void main(){
  vec4 foam = texture2D(FoamTexture,vUv);
  vec3 surface = mix(startColor / 255.0, endColor / 255.0, foam.r);  // r 分量代表 深度，线性插值颜色

  // 两次法向量采样偏移，进行波动
  vec3 norm1 = unPackNormMap(texture2D(NormTexture, vUv + uvParams.xy * time));
  vec3 norm2 = unPackNormMap(texture2D(NormTexture, vUv + uvParams.zw * time));
  vec3 localNorm = blenderNorm(norm1, norm2);

  // 1. 计算法向
  vec3 worldNorm = normalize(tangToWorldMatrix * mix(vec3(0.0, 0.0, 1.0), localNorm, normIntensity));

  // 2. 计算漫反射和高光
  vec3 lambert = diffusion(lightColor / 255.0, lightDir, 1.0, worldNorm);
  vec3 spe = blinnPhoneSpecular(lightColor / 255.0, lightDir, speIntensity, shininess, worldNorm, vView);
  vec3 fres = fresIntensity * fresnelLight(lightColor / 255.0, vView, worldNorm);

  vec3 dC = (detailColor / 255.0) * foam.b * detailIntensity;

  gl_FragColor = vec4(surface * (lambert + dC) / 2.0 + spe + fres, 1.0); 
}