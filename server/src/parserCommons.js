export function normalizeString(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

export function parsePay(str) {
  let match = normalizeString(str).match(/(\d+)(?:-(\d+))* (?:Ft|HUF)\/ *?([A-za-z]+)/i);
  let pay = null;
  if (match) {
    if (match[2]) pay = { min: parseInt(match[1]), max: parseInt(match[2]) };
    else pay = parseInt(match[1]);

    if (match.length > 3 && match[3].includes("ho")) {
      if (pay.min) {
        pay.min = Math.round(pay.min / 168);
        pay.max = Math.round(pay.max / 168);
      }
      else {
        pay = Math.round(pay / 168);
      }
    }
  }
  return pay;
}

export function bestHourGuessFromRegex(regex, str) {
  let bestGuess = null;

  let matches = [];
  let match;
  while (match = regex.exec(str)) {
    matches.push(match);
  }

  for (match of matches) {
    if (match[3].includes("ora") || match[3].includes("hour")) {
      if (!bestGuess) {
        bestGuess = { min: parseInt(match[1]), max: match[2] ? parseInt(match[2]) : null, type: "hours" };
      }
    }
    else if (!match[3].includes("honap") && (match[3].includes("nap") || match[3].includes("day"))) {
      if (!bestGuess || bestGuess.type !== "hours") {
        bestGuess = { min: Math.round(parseFloat(match[1]) * 8), max: match[2] ? Math.round(parseFloat(match[2]) * 8) : null, type: "days" };
      }
    }
  }

  if (bestGuess) delete bestGuess.type;
  return bestGuess;
}