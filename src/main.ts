import {
  DoubleSide,
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
import { getSentence, rewriteSentence } from "./utility";

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;

function main() {
  const g1 = {
    name: "basic",
    variables: "F",
    start: "F",
    rules: {
      // F: "F+F--F+F",
      F: "F+F-",
    },
    actions: {
      F: "forward",
      "+": "left",
      "-": "right",
    },
    startingAngle: 60,
    delta: 60,
    maxIterations: 6,
  };

  const z1 = getSentence(g1, 2);
  // console.log("z1", z1);

  const container: HTMLDivElement = document.querySelector("#scene-container")!;

  camera = createCamera();
  renderer = createRenderer();
  scene = createScene();

  container.append(renderer.domElement);

  var path4 = new Path3([
    new Vector3(0, 0, 0),
    new Vector3(10, 0, 0),
    new Vector3(10, 10, 0),
    new Vector3(0, 10, 0),
    new Vector3(0, 10, 10),
    new Vector3(10, 10, 10),
    new Vector3(10, 0, 10),
    new Vector3(0, 0, 10),
  ]);
  const pathSegments = 64;
  const tubeRadius = 0.35;
  const radiusSegments = 32;
  const closed = false;

  var geometry4 = new TubeGeometry(
    path4,
    pathSegments,
    tubeRadius,
    radiusSegments,
    closed
  );

  const meshMaterial = new MeshPhongMaterial({
    color: 0x000000,
    emissive: 0xfaedb9, // yellow
    // emissive: 0xa8e5ac, // green
    side: DoubleSide,
    flatShading: true,
  });
  const mesh = new Mesh(geometry4, meshMaterial);
  scene.add(mesh);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.3;

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  render();
}

main();
