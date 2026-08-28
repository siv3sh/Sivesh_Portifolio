import * as THREE from "three";
import { COPPER_PRIMARY, METAL_DARK } from "./tokens";

const ROT_SPEED = 0.003;

/**
 * Machined hex badge — matte metal, copper edge lines only.
 * @param {HTMLCanvasElement} canvas
 */
export function initLogoScene(canvas) {
  const size = 80;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
  camera.position.set(0, 0.15, 4);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "low-power",
  });
  renderer.setSize(size, size, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);

  const ambient = new THREE.AmbientLight(0xffffff, 0.55);
  const key = new THREE.DirectionalLight(0xfff8f2, 0.45);
  key.position.set(2, 3, 4);
  scene.add(ambient, key);

  const prismGeom = new THREE.CylinderGeometry(0.78, 0.78, 0.5, 6);
  const prismMat = new THREE.MeshStandardMaterial({
    color: METAL_DARK,
    metalness: 0.18,
    roughness: 0.88,
  });
  const prism = new THREE.Mesh(prismGeom, prismMat);

  const edgeGeom = new THREE.EdgesGeometry(prismGeom, 1);
  const edgeMat = new THREE.LineBasicMaterial({
    color: COPPER_PRIMARY,
    transparent: true,
    opacity: 0.52,
  });
  const edges = new THREE.LineSegments(edgeGeom, edgeMat);

  const logo = new THREE.Group();
  logo.add(prism, edges);
  scene.add(logo);

  let paused = false;
  let raf = 0;
  let running = true;

  const tick = () => {
    if (!running) return;
    raf = requestAnimationFrame(tick);
    if (!paused) logo.rotation.y += ROT_SPEED;
    renderer.render(scene, camera);
  };

  const onVisibility = () => {
    const visible = document.visibilityState === "visible";
    if (visible && !running) {
      running = true;
      tick();
    } else if (!visible) {
      running = false;
      cancelAnimationFrame(raf);
    }
  };
  document.addEventListener("visibilitychange", onVisibility);

  tick();

  return {
    setHovered(v) {
      paused = v;
    },
    destroy() {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      prismGeom.dispose();
      prismMat.dispose();
      edgeGeom.dispose();
      edgeMat.dispose();
      renderer.dispose();
    },
  };
}
