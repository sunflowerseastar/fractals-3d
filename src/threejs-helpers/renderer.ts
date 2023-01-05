import { WebGLRenderer } from "three";

function createRenderer() {
  console.log('createRenderer', createRenderer);
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  return renderer;
}

export { createRenderer };
