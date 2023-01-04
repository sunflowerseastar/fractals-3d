import { PerspectiveCamera } from "three";

function createCamera() {
  const camera = new PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(36, 48, 132);

  return camera;
}

export { createCamera };
