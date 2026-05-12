#define PI 3.14159
#define SKEW_FACTOR 1.0 / 3.0
#define UNSKEW_FACTOR 1.0 / 6.0
#define OCTAVES 2

uniform vec3 u_color;
uniform vec3 u_darkColor;
uniform vec3 u_lightColor;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_noiseStrength;
uniform float u_breath;

float random(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

float random(vec3 p) {
  return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453123);
}

vec3 randomGradient(vec3 p) {
  float x = random(p + vec3(1.0, 0.0, 0.0));
  float y = random(p + vec3(0.0, 1.0, 0.0));
  float z = random(p + vec3(0.0, 0.0, 1.0));

  return normalize(vec3(x, y, z) * 2.0 - 1.0);
}

vec3 getSimplexPoint(vec3 p) {
  return p + dot(p, vec3(SKEW_FACTOR));
}

vec3 getLocalPoint(vec3 p, vec3 simplexCell) {
  return p - simplexCell + dot(simplexCell, vec3(UNSKEW_FACTOR));
}

float getCornerInfluence(vec3 offset) {
  float i = 0.6 - dot(offset, offset);

  if (i < 0.0) {
    return 0.0;
  }

  return 23.0 * i * i * i * i;
}

float getGradientContribution(vec3 corner, vec3 offset) {
  vec3 gradient = randomGradient(corner);
  float influence = getCornerInfluence(offset);

  return influence * dot(gradient, offset);
}

float simplexNoise(vec3 p) {
  vec3 corner0, corner1, corner2, corner3;
  vec3 offset0, offset1, offset2, offset3;

  corner0 = floor(getSimplexPoint(p));
  corner3 = vec3(1.0);

  vec3 localPoint = getLocalPoint(p, corner0);

  if (localPoint.x >= localPoint.y) {
    if (localPoint.y >= localPoint.z) {
      corner1 = vec3(1.0, 0.0, 0.0);
      corner2 = vec3(1.0, 1.0, 0.0);
    } else if (localPoint.x >= localPoint.z) {
      corner1 = vec3(1.0, 0.0, 0.0);
      corner2 = vec3(1.0, 0.0, 1.0);
    } else {
      corner1 = vec3(0.0, 0.0, 1.0);
      corner2 = vec3(1.0, 0.0, 1.0);
    }
  } else {
    if (localPoint.y < localPoint.z) {
      corner1 = vec3(0.0, 0.0, 1.0);
      corner2 = vec3(0.0, 1.0, 1.0);
    } else if (localPoint.x < localPoint.z) {
      corner1 = vec3(0.0, 1.0, 0.0);
      corner2 = vec3(0.0, 1.0, 1.0);
    } else {
      corner1 = vec3(0.0, 1.0, 0.0);
      corner2 = vec3(1.0, 1.0, 0.0);
    }
  }
  offset0 = localPoint;
  offset1 = localPoint - corner1 + 1.0 * UNSKEW_FACTOR;
  offset2 = localPoint - corner2 + 2.0 * UNSKEW_FACTOR;
  offset3 = localPoint - corner3 + 3.0 * UNSKEW_FACTOR;

  float noise = 0.0;
  noise += getGradientContribution(corner0, offset0);
  noise += getGradientContribution(corner0 + corner1, offset1);
  noise += getGradientContribution(corner0 + corner2, offset2);
  noise += getGradientContribution(corner0 + corner3, offset3);

  return noise;
}

float fbm(vec3 st) {
  float value = 0.0;
  float amplitude = 1.0;

  for (int i = 0; i < OCTAVES; i++) {
    value += amplitude * simplexNoise(st);
    st *= 1.2;
    amplitude *= 0.5;
  }

  return value;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float t = u_time * 0.0002;
  float distortionScale = 0.5;
  float uvScale = 5.0;

  vec2 distortion = vec2(
    simplexNoise(vec3(st * distortionScale, t * 0.3)),
    simplexNoise(vec3(st * distortionScale, t * 0.3))
  );

  st *= distortion;

  float n = fbm(vec3(st * uvScale, t));
  n = 0.8 * n + 0.3;

  vec3 color = u_color;

  if (n < 0.5) {
    color = mix(u_darkColor, color, n / 0.5);
  }
  
  if (n > 0.5) {
    color = mix(color, u_lightColor, (n - 0.5) / 0.5);
  }


  // breath on scroll
  color *= (1.0 + u_breath);

  // noise
  float noise = random(gl_FragCoord.xy) - 0.5;
  color += noise * u_noiseStrength;
  color = clamp(color, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
