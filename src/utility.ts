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
  getSentenceRec(grammar, n, grammar.start.split(""));

// turtle 2d
const stepSize = 10

const pointForward = (x, y, heading) => {
  const theta = (Math.PI * heading) / 180.0;
  const newX = Math.cos(theta) * stepSize + x;
  const newY = Math.cos(theta) * stepSize + y;
  return [newX, newY];
};

const turtleRec = (letters, heading, delta, grammar, x, y, acc) => {
  if (letters.length <= 0) {
    return acc;
  } else {
    const firstLetter = letters[0];
    const action = grammar.actions[firstLetter];
    switch (action) {
      case "forward":
        // console.log("forward");
        const [newX, newY] = pointForward(x, y, heading);
        return turtleRec(
          letters.slice(1),
          heading,
          delta,
          grammar,
          newX,
          newY,
          [...acc, [newX, newY]]
        );
        break;
      case "left":
        // console.log("left");
        return turtleRec(
          letters.slice(1),
          (heading + delta) % 360,
          delta,
          grammar,
          x,
          y,
          acc
        );
        break;
      case "right":
        // console.log("right");
        return turtleRec(
          letters.slice(1),
          (heading - delta) % 360,
          delta,
          grammar,
          x,
          y,
          acc
        );
        break;
      default:
        console.log("default");
        break;
    }
  }
};
export const turtleReturnDrawPoints = (heading, delta, grammar, sentence) => {
  // console.log("turtleReturnDrawPoints()", grammar);
  const startingPoint = [0, 0];
  return turtleRec(
    sentence,
    heading,
    delta,
    grammar,
    startingPoint[0],
    startingPoint[1],
    [startingPoint]
  );
};
