export function normalizeString(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}


export function parsePay(str) {
  let match = normalizeString(str).match(/(\d+)(?:-(\d+))* (?:Ft|HUF)\/ *?([A-za-z]+)/i);
  let pay = null;
  const weeklyHours = 40;
  const monthlyHours = 168;
  if (match) {
    pay = { min: parseInt(match[1]), max: match[2] ? parseInt(match[2]) : null };

    if (match.length > 3 && (match[3].includes("het") || match[3].includes("week"))) {
      if (pay.min) pay.min = Math.round(pay.min / weeklyHours);
      if (pay.max) pay.max = Math.round(pay.max / weeklyHours);
    }

    if (match.length > 3 && match[3].includes("ho") && !match[3].includes("hour")) {
      if (pay.min) pay.min = Math.round(pay.min / monthlyHours);
      if (pay.max) pay.max = Math.round(pay.max / monthlyHours);
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