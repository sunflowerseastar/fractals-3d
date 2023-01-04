import { AxesHelper, Color, GridHelper, Scene } from "three";

function createScene() {
  const scene = new Scene();

  scene.background = new Color(0x242424);
  scene.add(new AxesHelper(50));
  scene.add(new GridHelper(100));

  return scene;
}

export { createScene };
