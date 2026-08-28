import * as THREE from "three";
import { COPPER_PRIMARY, METAL_DARK } from "./tokens";

function getScrollY() {
  return window.lenis?.scroll ?? window.scrollY;
}

/**
 * Three precision objects — hero parallax, product-teardown aesthetic.
 * @param {HTMLCanvasElement} canvas
 * @param {HTMLElement} boundsEl
 * @param {{ dprCap?: number }} [options]
 */
export function initFloatingObjects(canvas, boundsEl, options = {}) {
  const dprCap = options.dprCap ?? 1.5;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 60);
  camera.position.z = 9;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "high-performance",
  });

  scene.add(new THREE.AmbientLight(0xffffff, 0.1));
  const key = new THREE.DirectionalLight(0xfff5eb, 0.32);
  key.position.set(3, 4, 6);
  scene.add(key);

  const items = [];

  const icoGeom = new THREE.IcosahedronGeometry(0.72, 1);
  const icoEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(icoGeom),
    new THREE.LineBasicMaterial({
      color: COPPER_PRIMARY,
      transparent: true,
      opacity: 0.38,
    })
  );
  icoEdges.userData = {
    base: [-3.6, 1.1, -0.8],
    scrollRate: 0.00011,
    mouseRate: 0.022,
    spin: 0.0015,
    axis: "y",
  };
  scene.add(icoEdges);
  items.push(icoEdges);

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.95, 0.028, 12, 48),
    new THREE.MeshStandardMaterial({
      color: METAL_DARK,
      metalness: 0.35,
      roughness: 0.82,
    })
  );
  const torusEdge = new THREE.LineSegments(
    new THREE.EdgesGeometry(torus.geometry, 8),
    new THREE.LineBasicMaterial({
      color: COPPER_PRIMARY,
      transparent: true,
      opacity: 0.28,
    })
  );
  const torusGroup = new THREE.Group();
  torusGroup.add(torus, torusEdge);
  torusGroup.userData = {
    base: [3.5, 0.4, -0.4],
    scrollRate: 0.00014,
    mouseRate: 0.028,
    spin: 0.001,
    axis: "x",
  };
  scene.add(torusGroup);
  items.push(torusGroup);

  // Dropped third octahedron mesh — one fewer draw call

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = (e) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener("mousemove", onMove, { passive: true });

  let width = 1;
  let height = 1;
  let raf = 0;
  let active = true;
  const clock = new THREE.Clock();

  const resize = () => {
    const el = boundsEl ?? canvas.parentElement;
    width = el?.clientWidth ?? window.innerWidth;
    height = el?.clientHeight ?? window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
    renderer.setSize(width, height, false);
  };

  const animate = () => {
    raf = requestAnimationFrame(animate);
    if (!active) return;

    const dt = clock.getDelta();
    const scrollY = getScrollY();
    const k = 1 - Math.exp(-dt / 2.2);

    mouse.x += (mouse.tx - mouse.x) * k;
    mouse.y += (mouse.ty - mouse.y) * k;

    items.forEach((obj) => {
      const d = obj.userData;
      const mx = mouse.x * d.mouseRate;
      const my = mouse.y * d.mouseRate;

      obj.position.x = d.base[0] + mx;
      obj.position.y = d.base[1] - scrollY * d.scrollRate * 100 + my;
      obj.position.z = d.base[2];

      if (d.axis === "x") obj.rotation.x += d.spin;
      else if (d.axis === "y") obj.rotation.y += d.spin;
      else obj.rotation.z += d.spin;
    });

    renderer.render(scene, camera);
  };

  resize();
  animate();
  window.addEventListener("resize", resize, { passive: true });

  return {
    setActive(v) {
      active = v;
      if (v) clock.getDelta();
    },
    destroy() {
      active = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      icoGeom.dispose();
      icoEdges.geometry.dispose();
      icoEdges.material.dispose();
      torus.geometry.dispose();
      torus.material.dispose();
      torusEdge.geometry.dispose();
      torusEdge.material.dispose();
      renderer.dispose();
    },
  };
}
