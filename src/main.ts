import {
  DoubleSide,
  Euler,
  Matrix3,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { createCamera } from "./threejs-helpers/camera";
import { createScene } from "./threejs-helpers/scene";
import { createRenderer } from "./threejs-helpers/renderer";
import { Path3 } from "./Path3";
import { genTurtle3dVectorPath } from "./utility";

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;

function main() {
  // note that delta of 90 is assumed
  const hilbert2dPath = {
    variables: "LR",
    axiom: "L",
    rules: {
      L: "+RF-LFL-FR+",
      R: "-LF+RFR+FL-",
    },
    actions: {
      F: "forward",
      "+": "turn left",
      "-": "turn right",
    },
  };
  const hilbert3dPath = {
    variables: "X",
    axiom: "X",
    rules: { X: "^<XFF^<XFFX-FF^>>XFFX&FF+>>XFFX-FF>X->" },
    actions: {
      F: "forward",
      f: "forward",
      "+": "turn left",
      "-": "turn right",
      "&": "pitch down",
      "^": "pitch up",
      "<": "roll left",
      ">": "roll right",
    },
  };

  const container: HTMLDivElement = document.querySelector("#scene-container")!;

  camera = createCamera();
  renderer = createRenderer();
  scene = createScene();

  container.append(renderer.domElement);

  const numIterations = 3;

  const hilbertPath = genTurtle3dVectorPath(hilbert3dPath, numIterations);

  const path = new Path3(hilbertPath);

  const pathSegments = Math.pow(16, numIterations);
  const tubeRadius = 1;
  const radiusSegments = 32;
  const closed = false;

  var geometry4 = new TubeGeometry(
    path,
    pathSegments,
    tubeRadius,
    radiusSegments,
    closed
  );

  const meshMaterial = new MeshPhongMaterial({
    color: 0x000000,
    emissive: 0x242424,
    shininess: 100,
    side: DoubleSide,
    flatShading: false,
  });
  const mesh = new Mesh(geometry4, meshMaterial);
  scene.add(mesh);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.3;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.2;

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update()
  }
  render();
}

main();
