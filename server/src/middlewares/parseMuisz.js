import { parsePay } from "../parserCommons";

export default () => (req, res, next) => {
  if (!res.requestHtml["Műisz"]) return next("Problem with request for Műisz");

  const $ = res.requestHtml["Műisz"];
  let jobs = [];
  $("#Container>ul").children("div.budapest.informatikai").each((i, jobDiv) => {
    let pay = parsePay($(jobDiv).find("div.munka_ber").text());

    let link = $(jobDiv).find("a").eq(0).attr("href");
    let linkSpl = link.split("/");
    let id = parseInt(linkSpl[linkSpl.length - 1]);
    let name = $(jobDiv).find("h3.list_e").text().trim();

    res.jobs.push({ pay, name, link: "https://www.muisz.hu/" + link, id, organization: "Műisz" })
  });
  return next();
}