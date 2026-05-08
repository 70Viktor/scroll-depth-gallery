uniform float u_velocity;
uniform float u_strength;

float pi = 3.14;

void main() {
    vec3 newPosition = position;

    float factor = (sin(uv.x * pi) + sin(uv.y * pi)) / 2.0 - 0.5;

    newPosition.z += factor * u_strength * u_velocity;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}