import { parsePay } from "../parserCommons";

export default () => (req, res, next) => {
  if (!res.requestHtml["Schönherz"]) return next("Problem with request for Scönherz");

  const $ = res.requestHtml["Schönherz"];
  $("body").children("div").each((i, jobDiv) => {
    let pay = parsePay($(jobDiv).find(".sdcard-text h5").text());

    let anchor = $(jobDiv).find(".text h4 a");
    let name = anchor.text();
    let link = anchor.attr("href");
    let linkSpl = link.split("/");
    let id = parseInt(linkSpl[linkSpl.length - 1].split("-")[0]);

    res.jobs.push({ pay, name, link: "https://www.schonherz.hu" + link, id, organization: "Schönherz" });
  });

  return next();
}