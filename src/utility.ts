import { Euler, Matrix3, Quaternion, Vector3 } from "three";
import { Grammar } from "./main";

const radians = (deg: number) => (Math.PI * deg) / 180.0;

// l-system
const rewriteSentence = (grammar: Grammar, sentence: string[]) =>
  sentence.flatMap((x) =>
    grammar.variables.includes(x) ? grammar.rules[x].split("") : x
  );

const getSentenceRec = (
  grammar: Grammar,
  n: number,
  sentence: string[]
): string[] =>
  n === 0
    ? sentence
    : getSentenceRec(grammar, n - 1, rewriteSentence(grammar, sentence));

export const getSentence = (grammar: Grammar, n: number) =>
  getSentenceRec(grammar, n, grammar.axiom.split(""));

// turtle
const rotationMatrixRU = (d: number) => [
  Math.cos(d),
  0,
  Math.sin(d),
  0,
  1,
  0,
  -1 * Math.sin(d),
  0,
  Math.cos(d),
];
const rotationMatrixRL = (d: number) => [
  Math.cos(d),
  Math.sin(d),
  0,
  -1 * Math.sin(d),
  Math.cos(d),
  0,
  0,
  0,
  1,
];
const rotationMatrixRH = (d: number) => [
  1,
  0,
  0,
  0,
  Math.cos(d),
  Math.sin(d),
  0,
  -1 * Math.sin(d),
  Math.cos(d),
];

type RotationMatrices = {
  [key: string]: Matrix3;
};
const rotationMatrices: RotationMatrices = {
  "+": new Matrix3().fromArray(rotationMatrixRU(radians(-90))),
  "-": new Matrix3().fromArray(rotationMatrixRU(radians(90))),
  "&": new Matrix3().fromArray(rotationMatrixRL(radians(-90))),
  "^": new Matrix3().fromArray(rotationMatrixRL(radians(90))),
  "<": new Matrix3().fromArray(rotationMatrixRH(radians(-90))),
  ">": new Matrix3().fromArray(rotationMatrixRH(radians(90))),
};

export const turtle3d = (
  grammar: Grammar,
  stepSize: number,
  sentence: string[],
  startingPoint: Vector3
) => {
  let turtlePath = [startingPoint];
  let turtleHeading = new Matrix3();
  let turtlePosition = startingPoint;

  for (let action of sentence) {
    if (typeof rotationMatrices[action] !== "undefined") {
      // update heading by applying a rotation matrix
      turtleHeading.multiply(rotationMatrices[action]);
    } else if (action === "F") {
      // move forward
      const newPosition2: Vector3 = turtlePosition
        .clone()
        .add(new Vector3(stepSize, 0, 0).applyMatrix3(turtleHeading).round());
      turtlePosition = newPosition2;
      turtlePath.push(newPosition2);
    }
  }
  return turtlePath;
};

export const genTurtle3dVectorPath = (grammar: Grammar, n: number) => {
  const sentence = getSentence(grammar, n);
  const stepSize = n > 1 ? 10 / (n - 1) : 10;
  const startingDistanceFromCenter: number = stepSize * (Math.pow(2, n) - 1);
  const startingPoint: Vector3 = new Vector3(
    -startingDistanceFromCenter,
    -startingDistanceFromCenter,
    startingDistanceFromCenter
  );

  return turtle3d(grammar, stepSize, sentence, startingPoint);
};
