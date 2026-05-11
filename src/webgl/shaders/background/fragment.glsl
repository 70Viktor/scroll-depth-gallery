uniform vec3 u_color;
uniform vec3 u_blob1Color;
uniform vec3 u_blob2Color;
uniform float u_blobRadius;
uniform float u_blobBlurRadius;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_noiseStrength;
uniform float u_breath;

float random(vec2 coord) {
  return fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453123);
}

float PI = 3.14;

void main() {
  vec3 color = u_color;
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    
    uv = uv * 2.0 - 1.0;
    uv.x = uv.x * aspect;

    // blobs
    float t = u_time * 0.00025;

    vec2 blob1Center = vec2(
      sin(t) * 0.7 + cos(t * 1.5) * 0.3,
      cos(t) * 0.2
      );

    vec2 blob2Center = vec2(
      sin(PI + t) * 0.6,
      cos(PI + t) * 0.25 + sin(PI + t * 1.5) * 0.3
      );

    float blob1Mask = 1.0 - smoothstep(
      1.4 * u_blobRadius,
      1.4 * (u_blobRadius + u_blobBlurRadius),
      length(uv - blob1Center)
      );

    float blob2Mask = 1.0 - smoothstep(
      u_blobRadius,
      u_blobRadius + u_blobBlurRadius,
      length(uv - blob2Center)
      );

    color = mix(color, u_blob1Color, blob1Mask);
    color = mix(color, u_blob2Color, blob2Mask * 0.5);

    // breath on scroll
    color *= (1.0 + u_breath);

    // noise
    float noise = random(gl_FragCoord.xy) - 0.5;
    color += noise * u_noiseStrength;
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
}
