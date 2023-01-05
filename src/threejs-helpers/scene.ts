import {
  AmbientLight,
  // AxesHelper,
  Color,
  Fog,
  // GridHelper,
  PointLight,
  Scene,
} from "three";

function createScene() {
  const scene = new Scene();

  scene.background = new Color(0xf4f4f4);
  // scene.add(new AxesHelper(50));
  // scene.add(new GridHelper(100));

  const ambientLight = new AmbientLight(0x000000);
  scene.add(ambientLight);

  const light1 = new PointLight(0xffffff, 1, 0);
  light1.position.set(0, 200, 0);
  scene.add(light1);

  const light2 = new PointLight(0xffffff, 1, 0);
  light2.position.set(100, 200, 100);
  scene.add(light2);

  const light3 = new PointLight(0xffffff, 1, 0);
  light3.position.set(-100, -200, -100);
  scene.add(light3);

  const color = 0xffffff;
  const near = 60;
  const far = 280;
  scene.fog = new Fog(color, near, far);

  return scene;
}

export { createScene };
