import request from "../requestPromise";
import cheerio from "cheerio";

export default () => async (req, res, next) => {
  let result = [];
  for (let page = 0; true; page++) {
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
      return next(err);
    }
  }

  let html = result.reduce((acc, html) => {
    return acc + html;
  }, "");
  res.requestHtml["Schönherz"] = cheerio.load(html, { decodeEntities: true });
  return next();
}