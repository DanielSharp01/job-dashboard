import request from "../../requestPromise";
import cheerio from "cheerio";
import iconv from "iconv-lite";
import { Buffer } from "buffer";

export default async (req, res, next) => {
  let promises = [];
  for (let organization of req.organizations) {
    console.log(`Requesting ${organization} list`);
    promises.push(requestByOrg[organization](res));
  }

  await Promise.all(promises);
  return next();
}

const requestByOrg = [];

requestByOrg["Schönherz"] = async (res) => {
  let result = [];
  let page;
  for (page = 0; true; page++) {
    try {
      let html = await request({
        method: "POST",
        url: "https://www.schonherz.hu/tobbdiakmunka/budapest/fejleszto---tesztelo",
        json: true,
        body: {
          office: "budapest",
          type: "fejleszto---tesztelo",
          text: "",
          current: page
        }
      });
      if (!html || !html.includes("div")) break;
      result.push(html);
    }
    catch (err) {
      console.error(`Scönherz list page ${page}`, err);
      return;
    }
  }

  let html = result.reduce((acc, html) => { return acc + html; }, "");
  res.requestHtml["Schönherz"] = cheerio.load(html, { decodeEntities: true });
}

requestByOrg["Műisz"] = async (res) => {
  try {
    let body = await request({
      method: "GET",
      url: "https://www.muisz.hu",
      encoding: null
    });

    body = iconv.decode(Buffer.from(body), "ISO-8859-2")
    res.requestHtml["Műisz"] = cheerio.load(body);
  }
  catch (err) {
    console.error("Műisz list", err);
  }
}