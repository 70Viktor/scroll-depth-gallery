uniform vec3 u_color;
uniform vec3 u_blobColor;
uniform float u_blobRadius;
uniform float u_blobBlurRadius;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_noiseStrength;
uniform float u_breath;

float random(vec2 coord) {
  return fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    
    uv = uv * 2.0 - 1.0;
    uv.x = uv.x * aspect;

    vec2 blobCenter = vec2(0.0, 0.0);
    float distanceToBlob = length(uv - blobCenter);
    float blobStartRadius = u_blobRadius;
    float blobEndRadius = blobStartRadius + u_blobBlurRadius;
    float blobMask = 1.0 - smoothstep(blobStartRadius, blobEndRadius, distanceToBlob);

    vec3 color = mix(u_color, u_blobColor, blobMask);
    color = color * (1.0 + u_breath);

    float noise = random(gl_FragCoord.xy) - 0.5;
    color += noise * u_noiseStrength;
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
}
