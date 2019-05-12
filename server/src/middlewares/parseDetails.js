import { normalizeString, bestHourGuessFromRegex } from "../parserCommons";

export default () => async (req, res, next) => {
  for (let job of res.jobs) {
    if (!job.detailsHtml) continue;
    const $ = job.detailsHtml;

    let mainDiv;
    switch (job.organization) {
      case "Műisz":
        mainDiv = $("div#projects");
        break;
      case "Schönherz":
        mainDiv = $("div#ad-details");
        break;
    }

    let mainText = mainDiv.text();
    let h4s = mainDiv.find("h4");
    h4s.each((i, h4) => {
      let h4text = $(h4).text().toLowerCase();
      if (h4text.includes("munkaidő") || h4text.includes("óraszám")) {
        let hours = $(h4).next().text();
        job.hours = null;
        job.hours = findHoursInH4(hours);
      }
    });

    job.hours = job.hours || findHoursInText(mainText);
    job.tags = findTags(mainText).map(tag => tagMapping[tag.toLowerCase()] || tag);
  }
  return next();
}

let textTags = ["C#", "C++", "JS", "Javascript",
  "Node", "MySQL", "MongoDb", "Oracle", "HTML",
  "CSS", "Angular", "React", "Redux",
  "PHP", "Gyakornok", "Junior", "Trainee", "Intern", "Szoftver", "Software",
  "Back-end", "Backend", "Front-end", "Front end", "Programmer", "Programozó", "Developer", "Fejlesztő",
  "Test", "Teszt", "Home Office"];

let regexTags = [/\w+. kerület/, /Java\b/i];

let tagMapping = {
  "front end": "Front-end",
  "back-end": "Backend",
  "back end": "Backend",
  "java": "Java",
  "szoftver": "Software",
  "programozó": "Programmer",
  "fejlesztő": "Developer",
  "gyakornok": "Trainee",
  "teszt": "Test"
}

function findTags(text) {
  let textLower = text.toLowerCase();
  let tags = [];
  for (let tag of textTags) {
    if (textLower.includes(tag.toLowerCase())) {
      tags.push(tag);
    }
  }
  for (let tag of regexTags) {
    let match = text.match(tag);
    if (match) {
      tags.push(match[0]);
    }
  }
  return tags;
}

function findHoursInText(text) {
  const regex = /(?:min|heti)(?: *?[a-zA-Z]*){0,4}?(\d+(?:[,.]\d+)*)\+?(?: *?- *?(\d+(?:[,.]\d+)*))*[ ]*?([a-zA-Z]+)/g;
  text = normalizeString(text);
  return bestHourGuessFromRegex(regex, text);
}

function findHoursInH4(text) {
  const regex = /(\d+(?:[,.]\d+)*)\+?(?: *?- *?(\d+(?:[,.]\d+)*))*[ ]*?([a-zA-Z]+)/g;
  text = normalizeString(text);
  return bestHourGuessFromRegex(regex, text);
}