import * as THREE from "three";

const SURFACE_VERT = /* glsl */ `
  uniform vec2 uMouse;
  uniform float uTime;
  varying float vElev;
  varying vec3 vNormalW;

  void main() {
    vec3 pos = position;
    float wave =
      sin(pos.x * 0.07 + uTime * 0.12) * 0.12 +
      sin(pos.y * 0.055 + uTime * 0.09) * 0.1;
    float tilt = uMouse.x * pos.x * 0.06 + uMouse.y * pos.y * 0.05;
    pos.z += wave + tilt;

    vElev = pos.z;
    vNormalW = normalize(normalMatrix * normal);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const SURFACE_FRAG = /* glsl */ `
  varying float vElev;
  varying vec3 vNormalW;

  void main() {
    vec3 base = vec3(0.045, 0.038, 0.032);
    float shade = smoothstep(-0.08, 0.18, vElev) * 0.08;
    float ridge = smoothstep(0.04, 0.14, abs(dFdx(vElev)) + abs(dFdy(vElev)));
    float rim = pow(1.0 - abs(dot(normalize(vNormalW), vec3(0.0, 0.0, 1.0))), 3.0);
    vec3 copper = vec3(0.66, 0.56, 0.42) * (ridge * 0.16 + rim * 0.1);

    gl_FragColor = vec4(base + shade + copper, 0.42);
  }
`;

/**
 * Low-poly living surface behind hero name — form and shadow only.
 * @param {HTMLCanvasElement} canvas
 * @param {HTMLElement} container
 */
export function initHeroSurface(canvas, container) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
  camera.position.set(0, 0, 4.2);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });

  const uniforms = {
    uMouse: { value: new THREE.Vector2(0, 0) },
    uTime: { value: 0 },
  };

  const surface = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 3.2, 80, 80),
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: SURFACE_VERT,
      fragmentShader: SURFACE_FRAG,
      transparent: true,
      depthWrite: false,
    })
  );
  scene.add(surface);

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = (e) => {
    const rect = container.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouse.tx = THREE.MathUtils.clamp((e.clientX - cx) / (rect.width * 0.5), -1, 1) * 0.35;
    mouse.ty = THREE.MathUtils.clamp((e.clientY - cy) / (rect.height * 0.5), -1, 1) * 0.35;
  };
  window.addEventListener("mousemove", onMove, { passive: true });

  let width = 1;
  let height = 1;
  let raf = 0;
  const clock = new THREE.Clock();

  const resize = () => {
    width = Math.max(1, container.clientWidth);
    height = Math.max(1, container.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  };

  const animate = () => {
    raf = requestAnimationFrame(animate);
    const dt = clock.getDelta();
    const tau = 2;
    const k = 1 - Math.exp(-dt / tau);
    mouse.x += (mouse.tx - mouse.x) * k;
    mouse.y += (mouse.ty - mouse.y) * k;

    uniforms.uMouse.value.set(mouse.x, mouse.y);
    uniforms.uTime.value = clock.elapsedTime;

    renderer.render(scene, camera);
  };

  resize();
  animate();
  window.addEventListener("resize", resize);

  return {
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      surface.geometry.dispose();
      surface.material.dispose();
      renderer.dispose();
    },
  };
}
