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
