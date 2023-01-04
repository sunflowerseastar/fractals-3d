import { Euler, Matrix3, Quaternion, Vector3 } from "three";

const radians = (deg) => (Math.PI * deg) / 180.0;

// l-system
const rewriteSentence = (grammar, sentence) =>
  sentence.flatMap((x) =>
    grammar.variables.includes(x) ? grammar.rules[x].split("") : x
  );

const getSentenceRec = (grammar, n, sentence) =>
  n === 0
    ? sentence
    : getSentenceRec(grammar, n - 1, rewriteSentence(grammar, sentence));

export const getSentence = (grammar, n) =>
  getSentenceRec(grammar, n, grammar.axiom.split(""));

// turtle helpers
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

const rotationMatrices = {
  "+": new Matrix3().fromArray(rotationMatrixRU(radians(-90))),
  "-": new Matrix3().fromArray(rotationMatrixRU(radians(90))),
  "&": new Matrix3().fromArray(rotationMatrixRL(radians(-90))),
  "^": new Matrix3().fromArray(rotationMatrixRL(radians(90))),
  "<": new Matrix3().fromArray(rotationMatrixRH(radians(-90))),
  ">": new Matrix3().fromArray(rotationMatrixRH(radians(90))),
};

// turtle
const turtle3dRec = (
  grammar,
  stepSize,
  letters,
  heading,
  currentPoint,
  acc
) => {
  if (letters.length <= 0) {
    return acc;
  } else {
    const action = letters[0];

    const newHeading = rotationMatrices[action]
      ? heading.clone().multiply(rotationMatrices[action])
      : heading;

    const newPosition =
      action === "F"
        ? currentPoint
            .clone()
            .add(new Vector3(stepSize, 0, 0).applyMatrix3(heading).round())
        : currentPoint;
    const newAcc = action === "F" ? [...acc, newPosition] : acc;

    return turtle3dRec(
      grammar,
      stepSize,
      letters.slice(1),
      newHeading,
      newPosition,
      newAcc
    );
  }
};

export const turtle3d = (grammar, stepSize, sentence, startingPoint) => {
  const initialHeading = new Matrix3();
  return turtle3dRec(
    grammar,
    stepSize,
    sentence,
    initialHeading,
    startingPoint,
    [startingPoint]
  );
};

export const genTurtle3dVectorPath = (grammar, n) => {
  // console.log("genTurtle3dVectorPath");
  const sentence = getSentence(grammar, n);
  const stepSize = n > 1 ? 10 / (n - 1) : 10;
  const startingDistanceFromCenter = stepSize * (Math.pow(2, n) - 1);
  const startingPoint = new Vector3(
    -startingDistanceFromCenter,
    -startingDistanceFromCenter,
    startingDistanceFromCenter
  );

  const uncenteredPath = turtle3d(grammar, stepSize, sentence, startingPoint);
  return uncenteredPath;
};
