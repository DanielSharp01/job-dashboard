import { parsePay } from "../../parserCommons";

export default (req, res, next) => {
  for (let organization of req.organizations) {
    console.log(`Parsing ${organization} list`);
    parseByOrg[organization](res, next);
  }

  return next();
};

const parseByOrg = [];

parseByOrg["Schönherz"] = (res, next) => {
  if (!res.requestHtml["Schönherz"]) return next("Problem with request for Scönherz");

  const $ = res.requestHtml["Schönherz"];
  $("body")
    .children("div")
    .each((i, jobDiv) => {
      let pay = parsePay(
        $(jobDiv)
          .find(".sdcard-text h5")
          .text()
      );

      let anchor = $(jobDiv).find(".text h4 a");
      let name = anchor.text();
      let link = anchor.attr("href");
      let linkSpl = link.split("/");
      let id = parseInt(linkSpl[linkSpl.length - 1].split("-")[0]);

      res.jobs.push({ pay, name, link: "https://www.schonherz.hu" + link, id, organization: "Schönherz" });
    });
};

parseByOrg["Műisz"] = (res, next) => {
  if (!res.requestHtml["Műisz"]) return next("Problem with request for Műisz");

  const $ = res.requestHtml["Műisz"];
  let jobs = [];
  $("#Container>ul")
    .children("div.budapest.informatikai")
    .each((i, jobDiv) => {
      let pay = parsePay(
        $(jobDiv)
          .find("div.munka_ber")
          .text()
      );

      let link = $(jobDiv)
        .find("a")
        .eq(0)
        .attr("href");
      let linkSpl = link.split("/");
      let id = parseInt(linkSpl[linkSpl.length - 1]);
      let name = $(jobDiv)
        .find("h3.list_e")
        .text()
        .trim();

      res.jobs.push({ pay, name, link: "https://www.muisz.hu/" + link, id, organization: "Műisz" });
    });
};
